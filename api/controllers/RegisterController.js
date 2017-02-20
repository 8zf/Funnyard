/**
 * RegisterController
 *
 * @description :: Server-side logic for managing registers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const uuidV4 = require('uuid/v4');
const co = require('co');
module.exports = {
  default: function (req, res) {
    res.view('register_user', {
      title: "注册成为用户"
    });
  },

  addUser: function (req, res) {
    console.log(req.param('verify_code'));
    console.log(req.session.verify_code);
    if (req.param('verify_code') != req.session.verify_code) {
      return res.send("验证码错误");
    }
    req.session.expires = '';
    return res.send("验证成功");
    var new_record = {
      UserID: uuidV4(),
      Name: req.param('name'),
      PassWd: req.param('password'),
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
  },

  addPublisher: function (req, res) {

  },

  sendSMS: function (req, res) {
    var rec_num = req.param("phone_num");
    var verify_code = Math.random().toString().substring(2, 8);
    var result = SMSService.sendVerifyCode({code: verify_code, rec_num: rec_num});
    console.log('result:' +result);
    if (result == true) {
      req.session.verify_code = verify_code;
      console.log("验证码：" + verify_code);
      return res.send("success");
    }
    else {
      console.log('短信发送失败');
      //这里也发生，修改之后去掉
      req.session.verify_code = verify_code;
      return res.send('failed');
    }
  }
};

