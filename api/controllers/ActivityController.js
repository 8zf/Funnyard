/**
 * ActivityController
 *
 * @description :: Server-side logic for managing Activities
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const uuidV4 = require('uuid/v4');

module.exports = {
  add: function (req, res) {
    // var theme = req.param('theme');
    // var department = req.param('department');
    // var hold_date = req.param('hold_date');
    // var hold_time = req.param('hold_time');
    // var end_date = req.param('end_date');
    // var end_time = req.param('end_time');
    // var keyword = req.param('keyword');
    // var maxnum = req.param('maxnum');
    // var location = req.param('location');
    // var locationlng = req.param('locationlng');
    // var locationlat = req.param('locationlat');
    // var content = req.param('content');

    var new_record = {
      ActivityID: uuidV4(),
      Theme: req.param('theme'),
      Department: req.session.info.Department,
      PublisherID: req.session.info.PublisherID,
      HoldTime: req.param('hold_date') + " " + req.param('hold_time'),
      EndTime: req.param('end_date') + " " + req.param('end_time'),
      // Hold_date: req.param('hold_date'),
      // Hold_time: req.param('hold_time'),
      // End_date: req.param('end_date'),
      // End_time: req.param('end_time'),
      Keyword: req.param('keyword'),
      Maxnum: req.param('maxnum'),
      Location: req.param('location'),
      Locationlng: req.param('locationlng'),
      Locationlat: req.param('locationlat'),
      Content: req.param('content')
    };
    console.log(new_record);
    // return res.send(JSON.stringify(new_record));
    Activity.create(new_record).exec(function (err, record) {
      if (err) {
        console.log("创建活动失败");
        console.log(err);
        return res.send(err);
      }
      return res.send(record);
    });
  }
};

