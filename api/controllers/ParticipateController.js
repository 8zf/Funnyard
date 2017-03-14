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
      .exec(function (err, record) {
        if (err) {
          return res.serverError(err);
        }
        if (typeof record == 'undefined') {
          return res.notFound("未找到相符的活动");
        }
        if (record.NowNum >= record.MaxNum) {
          return res.forbidden("报名人数已满");
        }
        var time_now = new Date().getTime();
        var hold_time = new Date(record.HoldTime).getTime();
        if (time_now >= hold_time) {
          return res.forbidden("活动报名已截止");
        }
        //确认是否已经报名
        if (isParticipant(req.session.userid, record.Participant)) {
          return res.forbidden("您已报名");
        }
        //可以报名
        record.Participant.add(req.session.userid);
        record.NowNum++;
        record.save(function (err) {
          if (err) {
            //回滚一次
            console.log("参与活动数据库添加失败");
            console.log(err);
            record.NowNum--;
            record.save(function (err) {
              if (err)
                return res.serverError(err);
            });
            return res.serverError(err);
          }
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
      .exec(function (err, record) {
        if (err) {
          return res.serverError(err);
        }
        if (typeof record == 'undefined') {
          return res.notFound("未找到相符的活动");
        }
        // console.log(record);
        if (!isParticipant(req.session.userid, record.Participant)) {
          return res.forbidden("未参加活动")
        }
        record.NowNum--;
        record.Participant.remove(req.session.userid);
        record.save(function (err) {
          if (err) {
            return res.serverError(err);
          }
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

