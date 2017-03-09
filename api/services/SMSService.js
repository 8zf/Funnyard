// var App = require('co-alidayu');
var App = require('alidayu-node');
var app = new App('23632391', '390ec7ef515d368c940e3e2b996ae82f');

module.exports = {
  sendVerifyCode: function (options, callback) {
    app.smsSend({
      sms_free_sign_name: '趣往',
      sms_param: {"verify_code": options.code},
      rec_num: options.rec_num,
      sms_template_code: 'SMS_46545011'
    }, callback);
  },
  sendSMS: function (req, res) {
    var rec_num = parseInt(req.param("phone_num"));
    if (rec_num == "") {
      return res.send("号码为空");
    }
    var verify_code = Math.random().toString().substring(2, 8);
    var type = req.param("type");
    var target = {};
    var this_ = this;
    if (type == "user") {
      target = User;
    }
    else if(type = "publisher") {
      target = Publisher;
    }
    //确认手机号是否被注册
    target.find({PhoneNum: rec_num}).exec(function (err, records) {
      if (err) {
        return res.send(err);
      }
      if (records.length > 0) {
        console.log("手机号码已注册");
        return res.send("手机号码已注册");
      }
      this_.sendVerifyCode({code: verify_code, rec_num: rec_num}, function (result) {
        if (result.alibaba_aliqin_fc_sms_num_send_response) {
          if (result.alibaba_aliqin_fc_sms_num_send_response.result.err_code == '0')
            result = true;
        }
        else {
          result = result.error_response.sub_code;
        }
        if (result == true) {
          var new_record = {
            PhoneNum: rec_num,
            VerifyCode: verify_code,
            ExpireAt: new Date(new Date().getTime() + 10 * 60000).getTime()
          };
          console.log(new_record);
          //确认验证码是否存在有则替代
          VerifyPhone.find({PhoneNum: rec_num}).exec(function (err, record1) {
            if (err) {
              return res.send(err);
            }
            if (record1.length == 0) {
              //未找到
              console.log('未找到对应号码的验证码');
              VerifyPhone.create(new_record).exec(function (err, record2) {
                if (err) {
                  console.log(err);
                  return res.send(err)
                }
                console.log('new verify phone record created');
              });
            }
            else {
              //找到
              console.log('找到对应号码的验证码');
              VerifyPhone.update({PhoneNum: record1[0].PhoneNum}, {
                VerifyCode: verify_code,
                ExpireAt: new Date(new Date().getTime() + 10 * 60000).getTime()
              }).exec(function (err, record3) {
                if (err) {
                  console.log(err);
                  return res.send(err)
                }
                console.log('update verify code');
              });
            }
          });
          return res.send("success");
        }
        else {
          console.log('短信发送失败');
          console.log(result);
          return res.send(result);
        }
      });
    });


  }
};
