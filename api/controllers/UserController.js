const path = require('path');

module.exports = {

  register: function (req, res) {
    res.view('register/register_user', {
      title: "成为用户"
    });
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
        console.log(new_record);
        User.create(new_record).exec(function (err, record) {
          if (err) {
            console.log(err);
            return res.send(err)
          }
          console.log('new record created: ');
          // console.log(record);
          return res.redirect("/user_login");
          // return res.send('add user successfully' + JSON.stringify(record));
        });
      }
      else {
        return res.send("验证码错误或已失效");
      }
    });
  }
};

