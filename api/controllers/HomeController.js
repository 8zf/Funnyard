
module.exports = {
  
  default: function (req, res) {
    Activity.find()
      .exec(function (err, records) {
      if (err) {
        return res.serverError(err);
      }
      // console.log(JSON.stringify(records[1]));
      // console.log(typeof JSON.stringify(records[1]));
      return res.view("homepage", {
        activities: records
        // activities_json: JSON.stringify(records[1])
      });
    });
  },
  
  getActivities: function (req, res) {
    Activity.find()
      .exec(function (err, records) {
        if (err) {
          return res.serverError(err);
        }
        for (i in records) {
          records[i].Content = "";
        }
        return res.json(records);
      });
  }

};
