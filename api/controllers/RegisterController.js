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
  }
};

