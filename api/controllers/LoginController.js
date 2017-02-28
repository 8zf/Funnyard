/**
 * LoginController
 *
 * @description :: Server-side logic for managing logins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  userDefault: function (req, res) {
    res.view("user_login", {
      title: "登录趣往"
    });
  },

  publisherDefault: function (req, res) {
    res.view("publisher_login", {
      title: "登录趣往"
    });
  },

  validateUser:function (req, res) {
    User.find({or: [{Nickname: req.param('Name')}, {PhoneNum: req.param('Name')}]}).exec(function (err, result) {
      if (err) {
        return res.view('wrong', {message: "error occured: " + err});
      }

      if (result.length == 0) {
        return res.view('wrong', {message: "no such user found"});
      }

      if (result[0].PassWd == EncryptionService.genSHA1(req.param("PassWd")))
      {
        //authenticated
        req.session.authenticated = true;
        req.session.userid = result[0].UserID;
        req.session.role = "user";
        // console.log(req.session.authenticated);
        return res.redirect('/');
      }
      else {
        return res.view('wrong', {message: "wrong password"});
      }
    });
  },

  validatePublisher: function (req, res) {
    Publisher.find({or: [{Nickname: req.param('Name')}, {PhoneNum: req.param('Name')}]}).exec(function (err, result) {
      if (err) {
        return res.view('wrong', {message: "error occured: " + err});
      }

      if (result.length == 0) {
        return res.view('wrong', {message: "no such user found"});
      }
      if (result[0].PassWd == EncryptionService.genSHA1(req.param("PassWd")))
      {
        //authenticated
        req.session.authenticated = true;
        req.session.userid = result[0].PublisherID;
        req.session.role = "publisher";
        // console.log(req.session.authenticated);
        return res.redirect('/');
      }
      else {
        return res.view('wrong', {message: "wrong password"});
      }
    });
  },

  logout: function (req, res) {
    req.session.authenticated = false;
    req.session.userid = '';
    return res.redirect('/login');
  },

  success : function(req,res){
    return res.view('success', {layout : false});
  }

};

