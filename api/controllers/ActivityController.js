/**
 * ActivityController
 *
 * @description :: Server-side logic for managing Activities
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const uuidV4 = require('uuid/v4');

module.exports = {
  // TODO
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
    console.log(new_record);
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
            record.Features.add(record.Keywords.split(","));
            record.save(function (err) {
              if (err) {
                return res.serverError("活动添加关键词失败" + err);
              }
              console.log("活动与分类关联");
              return res.redirect("/ac/" + new_record.ActivityID);
            });
          })
        });
    });
  },

  show: function (req, res) {
    // console.log(req.allParams());
    // console.log("twice?");
    Activity.findOne({ActivityID: req.param('aid')})
      .populate("Owner")
      .populate("Features")
      .exec(function (err, record) {
        if (err) {
          return res.serverError(err);
        }
        // console.log("展示活动：" + record.ActivityID);
        return res.view('activity/activity', {
          activity: record
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
    }).exec(function (err, records) {
      if (err) {
        return res.serverError(err);
      }
      return res.send(records);
    })
  },

  delete: function (req, res) {
    var id = req.param("a_id");
  }
};

