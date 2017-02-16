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

  login: function (req, res) {
    User.find({name: req.param("Name")}).exec(function (err, result) {
      if (err) {
        return res.send("error occured: " + err);
      }
      if (result.length == 0) {
        return res.send("no such user found");
      }
      if (result[0].PassWd == req.param("PassWd"))
      {
        //authenticated
        var uuid = uuidV4();
        //send session to client
        res.cookie("session_id", uuid, {maxAge: 120000, httpOnly: true});
        //store session in server side


        return res.send("cookie set: " + uuid);
      }
      else {
        res.send("wrong password")
      }
      return res.send(JSON.stringify(result));
    })
  },

  validate : function(req,res){
    User.find({name: req.param("Name")}).exec(function (err, result) {
      if (err) {
        return res.view('wrong', {message: "error occured: " + err});
      }

      if (result.length == 0) {
        return res.view('wrong', {message: "no such user found"});
      }
      if (result[0].PassWd == req.param("PassWd"))
      {
        //authenticated
        req.session.authenticated = true;
        console.log(req.session.authenticated);
        return res.redirect('/');
      }
      else {
        return res.view('wrong', {message: "wrong password"});
      }
      return res.send(JSON.stringify(result));
    });
  },
  success : function(req,res){
    return res.view('success', {layout : false});
  },

};

