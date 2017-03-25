/**
 * ParticipateController
 *
 * @description :: Server-side logic for managing Participates
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  default: function (req, res) {
    Activity.findOne(req.param('aid')).exec(function (err, activity) {
      if (err) {
        return res.send(err);
      }
      activity.Participant.add(req.param('uid'));
      activity.save(function (err) {
        if (err)
          console.log("save to join table err");
        return res.send(err);
      });
    });
  },

  participate: function (req, res) {
    //用户才能访问
    //需要aid，uid，maxnum，nownum，state
    //获取activityid，userid，此userid要参与活动
    //检查现在报名人数是否已满，活动是否已经开始或结束
    Activity.findOne({ActivityID: req.param("aid")})
      .populate('Participant')
      .exec(function (err, activity) {
        if (err) {
          return res.serverError(err);
        }
        if (typeof activity == 'undefined') {
          return res.notFound("未找到相符的活动");
        }
        if (activity.NowNum >= activity.MaxNum) {
          return res.forbidden("报名人数已满");
        }
        var time_now = new Date().getTime();
        var hold_time = new Date(activity.HoldTime).getTime();
        if (time_now >= hold_time) {
          return res.forbidden("活动报名已截止");
        }
        //确认是否已经报名
        if (isParticipant(req.session.userid, activity.Participant)) {
          return res.forbidden("您已报名");
        }
        //可以报名
        activity.Participant.add(req.session.userid);
        activity.NowNum++;
        activity.save(function (err) {
          if (err) {
            //回滚一次
            sails.log.error("参与活动数据库添加失败");
            sails.log.error(err);
            activity.NowNum--;
            activity.save(function (err) {
              if (err)
                return res.serverError(err);
            });
            return res.serverError(err);
          }
          User.findOne({UserID: req.session.userid}).exec(function (err, user) {
            if (err) {
              sails.log.error("提醒用户参加活动成功时无法找到用户");
              sails.log.error(err);
            }
            var time = activity.HoldTime;
            SMSService.sendSMS({
              params: {
                "nickname": user.Nickname,
                "a_name": activity.Theme,
                "t_month": (time.getMonth() + 1).toString(),
                "t_day": time.getDate().toString(),
                "t_hour": time.getHours().toString(),
                "t_minute": time.getMinutes().toString(),
              }, rec_num: user.PhoneNum, template_code: 'SMS_57225339'
            }, function (response) {
              if (response.error_response) {
                sails.log.error("提醒用户报名成功失败");
                sails.log.error(response);
              }
              else if (response.alibaba_aliqin_fc_sms_num_send_response) {

              }
            });
          });
          //参与成功
          return res.send('报名成功');
        })
      });
  },

  quit: function (req, res) {
    //取消报名
    //检查是否是参与者
    Activity.findOne({ActivityID: req.param("aid")})
      .populate('Participant')
      .exec(function (err, activity) {
        if (err) {
          return res.serverError(err);
        }
        if (typeof activity == 'undefined') {
          return res.notFound("未找到相符的活动");
        }
        // console.log(activity);
        if (!isParticipant(req.session.userid, activity.Participant)) {
          return res.forbidden("未参加活动")
        }
        activity.NowNum--;
        activity.Participant.remove(req.session.userid);
        activity.save(function (err) {
          if (err) {
            return res.serverError(err);
          }
          User.findOne({UserID: req.session.userid}).exec(function (err, user) {
            if (err) {
              sails.log.error("提醒用户离开活动成功时无法找到用户");
              sails.log.error(err);
            }
            SMSService.sendSMS({
              params: {"nickname": user.Nickname, "a_name": activity.Theme},
              rec_num: user.PhoneNum,
              template_code: 'SMS_57265178'
            }, function (response) {
              if (response.error_response) {
                sails.log.error("提醒用户离开活动失败");
                sails.log.error(response);
              }
              else if (response.alibaba_aliqin_fc_sms_num_send_response) {

              }
            });
          });
          return res.send("取消成功");
        });
      });
  }
};


function isParticipant(userid, participant_array) {
  var result = -1;
  for (x in participant_array) {
    if (participant_array[x].UserID == userid) {
      result = x;
    }
  }
  return result != -1;
}

