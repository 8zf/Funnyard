
module.exports = {
  getInfo: function (req, res) {
    Activity.findOne().exec(function (err, record) {
      res.send(JSON.stringify(record));
    });
  }
};