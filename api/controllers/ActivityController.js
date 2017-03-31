/**
 * ActivityController
 *
 * @description :: Server-side logic for managing Activities
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const uuidV4 = require('uuid/v4');

module.exports = {
  add: function (req, res) {
    // var theme = req.param('theme');
    // var department = req.param('department');
    // var hold_date = req.param('hold_date');
    // var hold_time = req.param('hold_time');
    // var end_date = req.param('end_date');
    // var end_time = req.param('end_time');
    // var keyword = req.param('keyword');
    // var maxnum = req.param('maxnum');
    // var location = req.param('location');
    // var locationlng = req.param('locationlng');
    // var locationlat = req.param('locationlat');
    // var content = req.param('content');

    var new_record = {
      ActivityID: uuidV4(),
      Theme: req.param('theme'),
      Department: req.session.info.Department,
      // PublisherID: req.session.info.PublisherID,
      HoldTime: req.param('hold_date') + " " + req.param('hold_time'),
      EndTime: req.param('end_date') + " " + req.param('end_time'),
      Keywords: req.param('keywords'),
      Poster: req.param('poster'),
      MaxNum: req.param('maxnum'),
      Location: req.param('location'),
      LocationLng: req.param('locationlng'),
      LocationLat: req.param('locationlat'),
      Content: req.param('content')
    };
    // console.log(new_record);
    Activity.create(new_record).exec(function (err, record) {
      if (err) {
        console.log("创建活动失败");
        console.log(err);
        return res.serverError(err);
      }
      console.log("创建活动成功: " + record.ActivityID);
      // console.log(new_record);
      Publisher.findOne({PublisherID: req.session.userid})
        .populate("Publish")
        .exec(function (err, publisher) {
          publisher.Publish.add(record.ActivityID);
          publisher.save(function (err) {
            if (err) {
              return res.serverError(err + "无法创建发布者与活动的联系");
            }
            console.log("活动与发布者关联");
            console.log(record.Keywords.split(","));
            record.Features.add(record.Keywords.split(","));
            record.save(function (err) {
              if (err) {
                return res.serverError("活动添加关键词失败" + err);
              }
              console.log("活动与分类关联");
              return res.redirect("/ac/" + new_record.ActivityID);
            });
          });
        });
    });
  },

  show: function (req, res) {
    // console.log(req.allParams());
    // console.log("twice?");
    Activity.findOne({ActivityID: req.param('aid')})
      .populate("Owner")
      .populate("Features")
      .populate("Comment")
      .exec(function (err, record) {
        if (err) {
          return res.serverError(err);
        }
        record.ViewTime++;
        record.save(function (err) {
          if (err) {
            return res.serverError(err);
          }
        });
        // console.log("展示活动：" + record.ActivityID);
        return res.view('activity/activity', {
          activity: record
        });
      });
  },

  showAll: function (req, res) {
    Activity.find()
      .populate("Features")
      .exec(function (err, activities) {
        if (err) {
          return res.serverError(err);
        }
        var order;
        if (req.param("order") != "") {
          order = req.param("order");
          // console.log("order exists");
          switch (order) {
            case "viewtime":
              activities.sort(function (a, b) {
                return parseInt(b.ViewTime) - parseInt(a.ViewTime);
              });
              break;
            case "starttime":
              activities.sort(function (a, b) {
                //时间差从小到大 a>b
                return a.HoldTime.getTime() > b.HoldTime.getTime();
              });
              break;
            case "ing":
              activities = activities.filter(function (element) {
                return ((element.EndTime.getTime() > new Date().getTime()) && (element.HoldTime.getTime() < new Date().getTime()));
              });
              break;
            case "outofdate":
              activities = activities.filter(function (element) {
                // console.log(element.EndTime.getTime() + ", " + new Date().getTime());
                return element.EndTime.getTime() < new Date().getTime();
              });
              break;
            default:
              break;
          }
        }
        // console.log(activities);
        return res.view('activity/activities', {
          activities: activities
        })
      });
  },

  preview: function (req, res) {
    Activity.findOne({ActivityID: req.param('aid')})
      .populate("Owner")
      .populate("Features")
      .populate("Comment")
      .exec(function (err, record) {
        if (err) {
          return res.serverError(err);
        }
        // console.log("展示活动：" + record.ActivityID);
        return res.view('activity/preview', {
          activity: record,
          layout: false
        });
      });
  },

  search: function (req, res) {
    console.log(req.param('key'));
    Activity.find({
      or: [
        {
          Theme: {
            'like': '%' + req.param('key') + '%'
          }
        },
        {
          Location: {
            'like': '%' + req.param('key') + '%'
          }
        },
        {
          Content: {
            'like': '%' + req.param('key') + '%'
          }
        }],
    })
      .populate("Participant")
      .populate("Owner")
      .exec(function (err, activities) {
      if (err) {
        return res.serverError(err);
      }
      for (activity of activities) {
        activity.Participant = activity.Participant.length;
        activity.Owner = activity.Owner.Nickname;
      }
      return res.view("activity/search",{activities: activities});
    })
  },

  remove: function (req, res) {
    //删除之后要通知所有参与活动的用户
    var aid = req.param("aid");
    if (aid == "") {
      return res.serverError("no aid parameter");
    }
    console.log(aid);
    Activity.findOne({ActivityID: aid})
      .populate("Participant")
      .exec(function (err, activity) {
      if (err) {
        return res.serverError(err);
      }
      if (!activity) {
        return res.serverError("无法找到该活动");
      }
      var participants = activity.Participant;
      // console.log(participants);
      // 删除活动
      Activity.destroy({ActivityID: aid}).exec(function (err ,deleted_ac) {
        if (err) {
          return res.serverError(err);
        }
        // console.log(deleted_ac);
        for (var participant of participants) {
          //发送短信
          sails.log("发送短信提醒活动被取消: " + participant.PhoneNum);
          SMSService.sendSMS({params: {"nickname": participant.Nickname, "a_name": deleted_ac[0].Theme}, rec_num: participant.PhoneNum, template_code: 'SMS_59060041'}, function (response) {
            if (response.error_response) {
              sails.log.error("提醒用户活动取消失败");
              sails.log.error(response);
            }
          });
        }
        return res.send("success");
      });
    });

  }
};

