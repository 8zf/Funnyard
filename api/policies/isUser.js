module.exports = function(req, res, next) {
  // console.log(req.session.authenticated);
  // User is allowed, proceed to the next policy,
  // or if this is the last policy, the controller
  if (req.session.role == 'user') {
    return next();
  }

  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
  return res.send('您不是用户');
  // return res.forbidden('请先登录');
};
