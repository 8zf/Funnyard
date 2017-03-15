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
      Keywords: req.param('keyword'),
      Poster: req.param('poster'),
      MaxNum: req.param('maxnum'),
      Location: req.param('location'),
      LocationLng: req.param('locationlng'),
      LocationLat: req.param('locationlat'),
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
      return res.redirect("/activity/" + new_record.ActivityID);
    });
  },

  show: function (req, res) {
    // console.log(req.allParams());
    // console.log("twice?");
    Activity.findOne({ActivityID: req.param('aid')}).exec(function (err, record) {
      if (err) {
        return res.send(err);
      }
      console.log(record.ActivityID);
      return res.view('activity/activity', {
        activity: record
      });
    });
  }
};

