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
        if (req.param("order") != "") {
          order = req.param("order");
          // console.log("order exists");
          switch (order) {
            case "viewtime":
              records.sort(function (a, b) {
                return parseInt(b.ViewTime) - parseInt(a.ViewTime);
              });
              break;
            case "starttime":
              records.sort(function (a, b) {
                //时间差从小到大 a>b
                return a.HoldTime.getTime() > b.HoldTime.getTime();
              });
              break;
            case "ing":
              records = records.filter(function (element) {
                return ((element.EndTime.getTime() > new Date().getTime()) && (element.HoldTime.getTime() < new Date().getTime()));
              });
              break;
            case "outofdate":
              records = records.filter(function (element) {
                // console.log(element.EndTime.getTime() + ", " + new Date().getTime());
                return element.EndTime.getTime() < new Date().getTime();
              });
              break;
            default:
              break;
          }
          order = req.param("order");
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
