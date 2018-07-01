/**
 * CommentController
 *
 * @description :: Server-side logic for managing Comments
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  //手动增加用户的评论数
  //policy: isuser
  add: function (req, res) {
    //req.session.uid
    //req.aid
    //req.content
    //已经登录
    //create comment
    //activity.Comment.add
    //user.comment.add
    var content = req.param("content");
    var uid = req.session.userid;
    var aid = req.param("aid");
    console.log(content);
    console.log(uid);
    console.log(aid);
    Comment.create({Content: content}).exec(function (err, comment) {
      if (err) {
        console.log(err);
        return res.serverError(err);
      }
      User.findOne({UserID: uid}).exec(function (err, user) {
        comment.Icon = user.Icon;
        comment.Nickname = user.Nickname;
        comment.From.add(uid);
        comment.To.add(aid);
        comment.save(function (err) {
          if (err) {
            return res.serverError(err);
          }
          return res.send("success");
        });
      });
    });
  }
};

var x =1;
