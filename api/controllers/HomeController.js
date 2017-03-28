module.exports = {

  default: function (req, res) {
    //创建时间 createdat
    //点击数 viewtime
    //开始时间 starttime
    //正在举办 ing
    //过期的服务 outofdate
    //sort(): (a>b == true) => 从小到大, (a<b == true) => 从大到小
    var order;
    Activity.find({
      //未结束的活动
      EndTime: {
        '>=': new Date()
      }
    })
      .sort('createdAt DESC')
      .limit(12)
      .exec(function (err, records) {
        if (err) {
          return res.serverError(err);
        }
        return res.view("homepage",{activities: records});
          // activities_json: JSON.stringify(records[1])
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
