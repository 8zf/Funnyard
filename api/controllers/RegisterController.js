/**
 * RegisterController
 *
 * @description :: Server-side logic for managing registers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const uuidV4 = require('uuid/v4');
const co = require('co');
// var App = require('co-alidayu');
// var App = require('alidayu-node');
// var app = new App('23632391', '390ec7ef515d368c940e3e2b996ae82f');


module.exports = {
  default: function (req, res) {
    res.view('register/register', {
      title: "加入趣往"
    });
  },

  registerUser: function (req, res) {
    res.view('register/register_user', {
      title: "成为用户"
    });
  },

  registerPublisher: function (req, res) {
    res.view('register/register_publisher', {
      title: "成为发布者"
    });
  },

  addUser: function (req, res) {
    console.log(req.param('verify_code'));
    console.log(req.session.verify_code);
    VerifyPhone.find({PhoneNum: req.param('phone_num')}).exec(function (err, record) {
      console.log(record);
      if (record[0].VerifyCode == req.param('verify_code') && (new Date().getTime()) < parseInt(record[0].ExpireAt)) {
        //verified successfully
        var new_record = {
          UserID: uuidV4(),
          Name: req.param('name'),
          PassWd: EncryptionService.genSHA1(req.param('password')),
          Email: req.param('email'),
          PhoneNum: req.param('phone_num'),
          School: req.param('school'),
          Nickname: req.param('userid'),
          RegTime: new Date().toLocaleString()
        };
        User.create(new_record).exec(function (err, record) {
          if (err) {
            console.log(err);
            return res.send(err)
          }
          console.log('new record created: ');
          // console.log(record);
          return res.send('add user successfully' + JSON.stringify(record));
        });
      }
      else {
        return res.send("code wrong or time out");
      }
    });
    return res.send("register success");

  },

  addPublisher: function (req, res) {

  },

  sendSMS: function (req, res) {
    var rec_num = parseInt(req.param("phone_num"));
    var verify_code = Math.random().toString().substring(2, 8);

    SMSService.sendVerifyCode({code: verify_code, rec_num: rec_num}, function (result) {
      console.log(result);
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
          ExpireAt: new Date(new Date().getTime() + 1 * 60000).getTime()
        };
        VerifyPhone.create(new_record).exec(function (err, record) {
          if (err) {
            console.log(err);
            return res.send(err)
          }
          console.log('new record created: ');
          // console.log(record);
          // return res.send('add user successfully' + JSON.stringify(record));
        });
        // req.session.verify_code = verify_code;
        console.log("验证码：" + verify_code);
        return res.send("success");
      }
      else {
        console.log('短信发送失败');
        return res.send(result);
      }
    });

  }
};

