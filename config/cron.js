const interval = 3; //minute
const advance_amont = 24 * 60 * 60; //second=>one day
var loop_time = 0;
module.exports.cron = {
  firstJob: {
    //每x分钟检查活动是否即将开始，并且向用户发送消息
    schedule: '00 */' + interval + ' * * * *',
    onTick: function () {
      console.log('<-------- loop ' + loop_time + ' begin at ' + new Date().toLocaleString() + '------->');
      loop_time++;
      Activity.find()
        .populate("Participant")
        .exec(function (err, activity) {
          if (err) {
            sails.log.error(err);
          }
          for (var i = 0; i < activity.length; i++) {
            a_time = new Date(activity[i].HoldTime).getTime();
            n_time = new Date().getTime();
            if ((advance_amont * 1000 - a_time + n_time > 0) && (advance_amont * 1000 - a_time + n_time < interval * 60 * 1000)) {
              //活动在advance_amont内开始
              sails.log("activity " + activity[i].Theme + " is going to start");
              //向参与者发送短信
              for (var j = 0; j < activity[i].Participant.length; j++) {
                sails.log("向" + activity[i].Participant[j].PhoneNum + "发送信息");
                SMSService.sendSMS({
                  params: {"a_name": activity[i].Theme, "time": Math.round(advance_amont / 3600 / 24) + "天"},
                  rec_num: activity[i].Participant[j].PhoneNum,
                  template_code: 'SMS_57350110'
                }, function (response) {
                  if (response.error_response) {
                    sails.log("向用户发送提醒消息失败");
                    sails.log(err);
                    sails.log("以上为失败消息");
                  }
                  else if (response.alibaba_aliqin_fc_sms_num_send_response) {
                    // sails.log("发送成功");
                    // sails.log(response);
                    // sails.log("以上为成功响应");
                  }
                });
              }
            }
          }
        });
    },
    start: true
  }
};