function check_data() {
  if (document.myForm.userid.value.length == 0) {
    alert("请填写用户账号");
    return false;
  }

  if (document.myForm.password.value.length == 0) {
    alert("请填写用户密码");
    return false;
  }
  if (document.myForm.re_password.value.length == 0) {
    alert("请确认密码");
    return false;
  }
  if (document.myForm.password.value != document.myForm.re_password.value) {
    alert("密码确认失败");
    return false;
  }
  if (document.myForm.name.value.length == 0) {
    alert("请填写姓名");
    return false;
  }



  document.myForm.submit();
}
function webChange1() {
  var userid_text;
  var expr1 = new RegExp("^[\u4E00-\u9FA5\uF900-\uFA2Da-zA-Z0-9]{3,15}$");
  if (userid.value) {
    userid_text = userid.value;
    if (!expr1.test(userid_text)) {
      document.getElementById("userid_").style.display = 'inline';
      document.getElementById("userid_").innerHTML = "<p style='color: red;'>用户ID只能包含汉字与字母数字，3~15个字符</p>";
      document.getElementById("submitinfo").style.display = 'none';
    }
    else {
      document.getElementById("userid_").style.display = 'none';
      document.getElementById("submitinfo").style.display = 'inline';
    }
  }
}

function webChange2() {
  var password_text;
  var expr2 = new RegExp("^[a-zA-Z0-9,.*&^%$#@!~<>?{}+-=]{6,18}$");
  if (password.value) {
    password_text = password.value;
    if (!expr2.test(password_text)) {
      document.getElementById("password_").style.display = 'inline';
      document.getElementById("password_").innerHTML = "<p style='color: red;'>密码可包含字母数字和其他不包含 [];:'\"\\|/ 的符号，6~18个字符</p>";
      document.getElementById("submitinfo").style.display = 'none';
    }
    else {
      document.getElementById("password_").style.display = 'none';
      document.getElementById("submitinfo").style.display = 'inline';
    }
  }
}

function webChange3() {
  var name_text;
  var expr31 = new RegExp("^[\u4E00-\u9FA5\uF900-\uFA2D]{2,5}$");
  var expr32 = new RegExp("^[a-zA-Z ]{2,15}$");
  if (name.value) {
    name_text = name.value;
    if (expr31.test(name_text) || expr32.test(name_text)) {
      document.getElementById("name_").style.display = 'none';
      document.getElementById("submitinfo").style.display = 'inline';
    }
    else {
      document.getElementById("name_").style.display = 'inline';
      document.getElementById("name_").innerHTML = "<p style='color: red;'>请输入纯中文或纯英文，中文2~5个字符，英文可包括空格2~15个字符</p>";
      document.getElementById("submitinfo").style.display = 'none';
    }
  }
}

function webChange4() {
  var email_text;
  var expr4 = new RegExp("^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$");
  if (email.value) {
    email_text = email.value;
    //测试未通过
    if (!expr4.test(email_text)) {
      document.getElementById("email_").style.display = 'inline';
      document.getElementById("sendemail").style.display = 'none';
      document.getElementById("email_").innerHTML = "<p style='color: red;'>请输入合法邮箱</p>";
      document.getElementById("submitinfo").style.display = 'none';
    }
    else {
      document.getElementById("email_").style.display = 'none';
      document.getElementById("sendemail").style.display = 'inline';
      document.getElementById("submitinfo").style.display = 'inline';
    }
  }
}

function webChange5() {

}

function immediately() {
  var userid = document.getElementById("userid");
  var password = document.getElementById("password");
  var name = document.getElementById("name");
  // var email = document.getElementById("email");
  var phone_num = document.getElementById("phone_num");
  if ("\v" == "v") {
    userid.onpropertychange = webChange1;
    password.onpropertychange = webChange2();
    name.onpropertychange = webChange3();
    // email.onpropertychange = webChange4();
    phone_num.onpropertychange = webChange5();
  }
  else {
    userid.addEventListener("input", webChange1, false);
    password.addEventListener("input", webChange2, false);
    name.addEventListener("input", webChange3, false);
    // email.addEventListener("input", webChange4, false);
    phone_num.addEventListener("input", webChange5(), false);
  }
}

function sendEmail() {
  var xmlhttp;
  if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
  }
  else {// code for IE6, IE5
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      alert('邮件发送成功,请打开邮箱验证');
      return true;
    }
  };
  var address = document.getElementById('email').value;
  //alert(address);
  xmlhttp.open("GET", "sendemail.php?address=" + address, true);
  xmlhttp.send();
}

function sendSMS() {
  var xmlhttp;
  if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
  }
  else {// code for IE6, IE5
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      alert(xmlhttp.responseText);
      return true;
    }
  };
  var phone_num = document.getElementById('phone_num').value;
  //alert(address);
  xmlhttp.open("GET", "sendSMS?phone_num=" + phone_num + "&type=user", true);
  xmlhttp.send();
}

function verifyPhone() {

}

function validatefunc() {
  var xmlhttp2;
  if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp2 = new XMLHttpRequest();
  }
  else {// code for IE6, IE5
    xmlhttp2 = new ActiveXObject("Microsoft.XMLHTTP");
  }
  var valicode = document.getElementById('validate').value;
  xmlhttp2.open("GET", "validate.php?valicode=" + valicode, true);
  xmlhttp2.send();
  xmlhttp2.onreadystatechange = function () {
    if (xmlhttp2.readyState == 4 && xmlhttp2.status == 200) {
      // var shit = xmlhttp2.responseText.toString();
      // alert(shit);
      if (xmlhttp2.responseText == 1) {
        alert("验证通过！");
        document.getElementById("submitinfo").style.display = 'inline';
      }
      else if (xmlhttp2.responseText == 0) {
        alert("验证码不匹配，请确认");
        document.getElementById("submitinfo").style.display = 'none';
      }
    }
  };
}

