/**
 * LoginController
 *
 * @description :: Server-side logic for managing logins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  default: function (req, res) {
    res.view("login", {
      title: "登录趣往",
      layout: false
    });
  },

  userDefault: function (req, res) {
    res.view("login", {
      title: "登录趣往",
      layout: false
    });
  },

  publisherDefault: function (req, res) {
    res.view("login", {
      title: "登录趣往",
      layout: false
    });
  },

  validateUser:function (req, res) {
    User.find({or: [{Nickname: req.param('Name')}, {PhoneNum: req.param('Name')}]}).exec(function (err, result) {
      if (err) {
        return res.serverError(err);
      }

      if (result.length == 0) {
        return res.view('wrong', {message: "no such user found"});
      }

      if (result[0].PassWd == EncryptionService.genSHA1(req.param("PassWd")))
      {
        //authenticated
        if (!req.session) {
          return res.serverError('会话数据库错误');
        }
        req.session.authenticated = true;
        req.session.userid = result[0].UserID;
        req.session.role = "user";
        req.session.name = result[0].Name;
        req.session.nickname = result[0].Nickname;
        req.session.icon = result[0].Icon;
        // console.log(req.session.icon);
        // console.log(req.session.authenticated);
        // console.log(req.session);
        return res.redirect('/');
      }
      else {
        return res.view('wrong', {message: "wrong password"});
      }
    });
  },

  validatePublisher: function (req, res) {
    console.log('validate publisher');
    Publisher.find({or: [{Nickname: req.param('Name')}, {PhoneNum: req.param('Name')}]}).exec(function (err, result) {
      if (err) {
        return res.serverError(err);
      }

      if (result.length == 0) {
        return res.forbidden("未找到该发布者账号");
      }
      if (result[0].PassWd == EncryptionService.genSHA1(req.param("PassWd")))
      {
        //authenticated
        req.session.authenticated = true;
        req.session.userid = result[0].PublisherID;
        req.session.role = "publisher";
        req.session.department = result[0].Department;
        req.session.phone = result[0].PhoneNum;
        req.session.nickname = result[0].Nickname;
        req.session.icon = result[0].Icon;
        req.session.info = result[0];
        // console.log(req.session.authenticated);
        // console.log(req.session);
        return res.redirect('/');
      }
      else {
        return res.view('wrong', {message: "wrong password"});
      }
    });
  },

  logout: function (req, res) {
    if (req.session) {
      req.session.destroy(function(err) {
        res.redirect('/login');
      });
    }
    else {
      res.redirect('/login');
    }
  },

  success : function(req,res){
    return res.view('success', {layout : false});
  }

};

