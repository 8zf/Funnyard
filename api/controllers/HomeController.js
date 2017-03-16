
module.exports = {
  
  default: function (req, res) {
    Activity.find().exec(function (err, records) {
      if (err) {
        return res.serverError(err);
      }
      return res.view("homepage", {
        activities: records
      });
    });
  }

};
