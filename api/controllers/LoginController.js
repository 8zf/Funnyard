/**
 * LoginController
 *
 * @description :: Server-side logic for managing logins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  default: function (req, res) {
    res.view("login", {
      title: "登录趣往"
    });
  },

  addUser: function (req, res) {
    res.view("register_user", {
      title: "注册成为用户"
    });
  },

  validate: function(req,res){
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

