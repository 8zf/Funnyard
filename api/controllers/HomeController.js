
module.exports = {
  getInfo: function (req, res) {
    // Publisher.find().exec(function (err, record) {
    //   return res.send(JSON.stringify(record));
    // });
    // console.log('In homecontroller, userid: ' + res.UserID);
    return res.view('homepage');
  }
};
