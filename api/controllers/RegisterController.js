/**
 * RegisterController
 *
 * @description :: Server-side logic for managing registers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const uuidV4 = require('uuid/v4');

module.exports = {
  addUser: function (req, res) {

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
  verifyPhone: function (req, res) {
    var rec_num = req.param("phone_num");
    var verify_code = Math.random().toString().substring(2, 8);
    var result = SMSService.sendVerifyCode({code: verify_code, rec_num: rec_num});
    if (result == true) {
      req.session.verify_code = verify_code;
      return res.send("success");
    }
    else {
      return res.send(JSON.stringify(result));
    }
  }
};

