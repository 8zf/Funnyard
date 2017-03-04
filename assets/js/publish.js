//检测输入的脚本
function check_data() {
  var content_ = ue.getContent();
  document.getElementById('content').value = content_;

  if (document.activity_info.theme.value.length == 0) {
    alert("请填写活动主题");
    return false;
  }

  if (document.activity_info.hold_date.value.length == 0) {
    alert("请填写活动日期");
    return false;
  }
  if (document.activity_info.hold_time.value.length == 0) {
    alert("请填写活动时间");
    return false;
  }
  if (document.activity_info.end_date.value.length == 0) {
    alert("请填写活动结束日期");
    return false;
  }
  if (document.activity_info.end_time.value.length == 0) {
    alert("请填写活动结束时间");
    return false;
  }
  if (document.activity_info.keyword.value.length == 0) {
    alert("请选择活动分类（关键字）");
    return false;
  }
  if (document.activity_info.maxnum.value.length == 0) {
    alert("请填写活动人数");
    return false;
  }
  if (document.activity_info.location.value.length == 0) {
    alert("请填写活动地点");
    return false;
  }
  if (document.activity_info.locationlng.value.length == 0) {
    alert("请标注地图");
    return false;
  }
  if (document.activity_info.locationlat.value.length == 0) {
    alert("请标注地图");
    return false;
  }
  if (document.activity_info.content.value.length == 0) {
    alert("活动内容不得为空");
    return false;
  }

  document.activity_info.submit();
}

function immediately() {
  
}