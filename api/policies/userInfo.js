/**
 * Created by zhang on 2/16/17.
 */

module.exports = function (req, res, next) {
  if (req.session.authenticated == true) {
    res.UserID = req.session.UserID;
    console.log('In userInfo policy, userid:' + res.UserID);
    next();
  }
  // else {
  //   res.UserID = 'null';
  //   next();
  // }
};
