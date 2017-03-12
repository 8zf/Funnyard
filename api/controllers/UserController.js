const path = require('path');
const uuidV4 = require('uuid/v4');
const qiniu = require('qiniu');

module.exports = {

  register: function (req, res) {
    res.view('login', {
      title: "成为用户",
      layout: false
    });
  },

  toSpace: function (req, res) {
    return res.view("personal/content", {layout: "personal/layout"});
  },

  add: function (req, res) {
    //检测验证码是否存在，有则替换，无则创建
    //检测验证码是否正确
    //其他输入在前端已经检验过
    console.log(req.param('verify_code'));
    // console.log(req.session.verify_code);
    VerifyPhone.find({PhoneNum: req.param('phone_num')}).exec(function (err, record) {
      if (err) {
        console.log(err);
        return res.send(err);
      }
      // console.log(record);
      // console.log(record[0].VerifyCode);
      // console.log(req.param('verify_code'));
      // console.log(new Date().getTime());
      // console.log(parseInt(record[0].ExpireAt));
      if (record.length == 0) {
        return res.send("验证码未发送");
      }
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
        console.log("new user");
        console.log(new_record);
        User.create(new_record).exec(function (err, record) {
          if (err) {
            console.log(err);
            return res.send(err)
          }
          console.log('new record created: ');
          // console.log(record);
          return res.redirect("/login");
          // return res.send('add user successfully' + JSON.stringify(record));
        });
      }
      else {
        return res.send("验证码错误或已失效");
      }
    });
  },
  
  update: function (req, res) {
    
  }



  // getProfile: function (req, res) {
  //
  // },
  //
  // getAssociatedActivities: function (req, res) {
  //
  // }
};

