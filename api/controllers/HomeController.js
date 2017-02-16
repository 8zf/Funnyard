
module.exports = {
  getInfo: function (req, res) {
    // Publisher.find().exec(function (err, record) {
    //   return res.send(JSON.stringify(record));
    // });
    return res.send('you log in, man');
  },
  getSession: function (req, res) {
    console.log(req.cookies);
    return res.send(req.session.session_id);
  }
};
