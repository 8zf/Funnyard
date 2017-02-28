/**
 * RegisterController
 *
 * @description :: Server-side logic for managing registers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const uuidV4 = require('uuid/v4');

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
          return res.redirect("/login");
          // return res.send('add user successfully' + JSON.stringify(record));
        });
      }
      else {
        return res.send("验证码错误或已失效");
      }
    });
  },

  addPublisher: function (req, res) {
    var publisher_code = req.param('publisher_code');
    var userid = req.param('userid');
    var password = req.param('password');
    var phone_num = req.param('phone_num');
    var email = req.param('email');
    var name = req.param('name');
    //检查注册码是否可用
    //手机号码是否已注册
    //验证码是否正确
    PublisherCode.find({Code: publisher_code}).exec(function (err, records) {
      if (err) {
        return res.send(err);
      }
      if (records.length == 0) {
        return res.send('注册码无效');
      }
      if (records[0].IsUsable == 0)
      {
        return res.send('注册码已被使用');
      }
      //注册码正确
      Publisher.find({PhoneNum: phone_num}).exec(function (err, records) {
        if (err) {
          return res.send(err)
        }

      });
    });
  },

  sendSMS: function (req, res) {
    var rec_num = parseInt(req.param("phone_num"));
    var verify_code = Math.random().toString().substring(2, 8);

    //确认手机号是否被注册
    User.find({PhoneNum: rec_num}).exec(function (err, records) {
      if (err) {
        return res.send(err);
      }
      if (records.length > 0) {
        return res.send("手机号码已注册");
      }
      SMSService.sendVerifyCode({code: verify_code, rec_num: rec_num}, function (result) {
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
          VerifyPhone.find({PhoneNum: rec_num}).exec(function (err, record1) {
            if (err) {
              return res.send(err);
            }
            if (record1.length == 0) {
              //未找到
              console.log('未找到');
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
              console.log('找到');
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

