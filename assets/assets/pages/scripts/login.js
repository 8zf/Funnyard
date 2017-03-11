jQuery.validator.addMethod("isUserID", function (value, element, param) {
  var length = value.length;
  var ver = /^[a-zA-Z0-9]{3,15}$/;
  if (length > 15 || length < 3) {
    return false;
  }
  if (!ver.test(value)) {
    return false;
  }
  return true;
}, $.validator.format("用户ID不能包含汉字与符号，3~15位"));

jQuery.validator.addMethod("isName", function (value, element, param) {
  var length = value.length;
  var ver = /^[\u4E00-\u9FA5\uF900-\uFA2Da-zA-Z0-9]{3,15}$/;
  if (length > 20 || length < 2) {
    return false;
  }
  if (!ver.test(value)) {
    return false;
  }
  return true;
}, $.validator.format("姓名不能包含符号，2~20个字符"));

jQuery.validator.addMethod("isPassword", function (value, element, param) {
  var length = value.length;
  var ver = /^[a-zA-Z0-9,.*&^%$#@!~<>?{}+-=]{6,18}$/;
  if (length > 18 || length < 6) {
    return false;
  }
  if (!ver.test(value)) {
    return false;
  }
  return true;
}, $.validator.format("密码可包含字母数字和其他不包含 [];:'\"\\|/ 的符号，6~18个字符"));

jQuery.validator.addMethod("isPublisherCode", function (value, element, param) {
  // var length = value.length;
  var ver = /^[a-zA-Z0-9,-]{10,100}$/;
  // if (length >18 || length < 6) {
  //   return false;
  // }
  if (!ver.test(value)) {
    return false;
  }
  return true;
}, $.validator.format("请输入正确格式的注册码<a href='/getPublisherCode'>如何获得注册码</a>"));

var Login = function () {

  var handleLogin = function () {

    $('.login-form').validate({
      errorElement: 'span', //default input error message container
      errorClass: 'help-block', // default input error message class
      focusInvalid: false, // do not focus the last invalid input
      rules: {
        username: {
          required: true
        },
        password: {
          required: true
        },
        remember: {
          required: false
        }
      },

      messages: {
        username: {
          required: "Username is required."
        },
        password: {
          required: "Password is required."
        }
      },

      invalidHandler: function (event, validator) { //display error alert on form submit
        $('.alert-danger', $('.login-form')).show();
      },

      highlight: function (element) { // hightlight error inputs
        $(element)
          .closest('.form-group').addClass('has-error'); // set error class to the control group
      },

      success: function (label) {
        label.closest('.form-group').removeClass('has-error');
        label.remove();
      },

      errorPlacement: function (error, element) {
        error.insertAfter(element.closest('.input-icon'));
      },

      submitHandler: function (form) {
        form.submit(); // form validation success, call ajax form submit
      }
    });

    $('.login-form input').keypress(function (e) {
      if (e.which == 13) {
        if ($('.login-form').validate().form()) {
          $('.login-form').submit(); //form validation success, call ajax form submit
        }
        return false;
      }
    });
  };

  var handleForgetPassword = function () {
    $('.forget-form').validate({
      errorElement: 'span', //default input error message container
      errorClass: 'help-block', // default input error message class
      focusInvalid: false, // do not focus the last invalid input
      ignore: "",
      rules: {
        email: {
          required: true,
          email: true
        }
      },

      messages: {
        email: {
          required: "Email is required."
        }
      },

      invalidHandler: function (event, validator) { //display error alert on form submit

      },

      highlight: function (element) { // hightlight error inputs
        $(element)
          .closest('.form-group').addClass('has-error'); // set error class to the control group
      },

      success: function (label) {
        label.closest('.form-group').removeClass('has-error');
        label.remove();
      },

      errorPlacement: function (error, element) {
        error.insertAfter(element.closest('.input-icon'));
      },

      submitHandler: function (form) {
        form.submit();
      }
    });

    $('.forget-form input').keypress(function (e) {
      if (e.which == 13) {
        if ($('.forget-form').validate().form()) {
          $('.forget-form').submit();
        }
        return false;
      }
    });

    jQuery('#forget-password').click(function () {
      jQuery('.login-form').hide();
      jQuery('.forget-form').show();
    });

    jQuery('#back-btn').click(function () {
      jQuery('.login-form').show();
      jQuery('.forget-form').hide();
    });

  };

  var handleRegisterUser = function () {

    $('.register-user-form').validate({
      errorElement: 'span', //default input error message container
      errorClass: 'help-block', // default input error message class
      focusInvalid: false, // do not focus the last invalid input
      ignore: "",
      rules: {
        name: {
          required: true,
          isName: true
        },
        userid: {
          required: true,
          isUserID: true
        },
        password: {
          required: true,
          isPassword: true
        },
        repassword: {
          equalTo: "#register_user_password"
        },
        phone_num: {
          number: true,
          rangelength: [11, 11]
        },
        verify_code: {
          number: true,
          rangelength: [6, 6]
        }
      },

      messages: { // custom messages for radio buttons and checkboxes
        repassword: "请再次正确输入密码",
        phone_num: "请输入正确的电话号码",
        verify_code: "请输入六位数字验证码"
      },

      invalidHandler: function (event, validator) { //display error alert on form submit

      },

      highlight: function (element) { // hightlight error inputs
        $(element)
          .closest('.form-group').addClass('has-error'); // set error class to the control group
      },

      success: function (label) {
        label.closest('.form-group').removeClass('has-error');
        label.remove();
      },

      errorPlacement: function (error, element) {
        if (element.attr("name") == "tnc") { // insert checkbox errors after the container
          error.insertAfter($('#register_tnc_error'));
        } else if (element.closest('.input-icon').size() === 1) {
          error.insertAfter(element.closest('.input-icon'));
        } else {
          error.insertAfter(element);
        }
      },

      submitHandler: function (form) {
        form[0].submit();
      }
    });

    $('.register-user-form input').keypress(function (e) {
      console.log(e.which);
      if (e.which == 13) {
        if ($('.register-user-form').validate().form()) {
          $('.register-user-form').submit();
        }
        return false;
      }
    });
  };

  var handleRegisterPublisher = function () {

    $('.register-publisher-form').validate({
      errorElement: 'span', //default input error message container
      errorClass: 'help-block', // default input error message class
      focusInvalid: false, // do not focus the last invalid input
      ignore: "",
      rules: {
        name: {
          required: true,
          isName: true
        },
        userid: {
          required: true,
          isUserID: true
        },
        password: {
          required: true,
          isPassword: true
        },
        repassword: {
          equalTo: "#register_publisher_password"
        },
        phone_num: {
          number: true,
          rangelength: [11, 11]
        },
        verify_code: {
          number: true,
          rangelength: [6, 6]
        },
        publisher_code: {
          required: true,
          isPublisherCode: true
        }
      },

      messages: { // custom messages for radio buttons and checkboxes
        repassword: "请再次正确输入密码",
        phone_num: "请输入正确的电话号码",
        verify_code: "请输入六位数字验证码"
      },

      invalidHandler: function (event, validator) { //display error alert on form submit

      },

      highlight: function (element) { // hightlight error inputs
        $(element)
          .closest('.form-group').addClass('has-error'); // set error class to the control group
      },

      success: function (label) {
        label.closest('.form-group').removeClass('has-error');
        label.remove();
      },

      errorPlacement: function (error, element) {
        if (element.attr("name") == "tnc") { // insert checkbox errors after the container
          error.insertAfter($('#register_tnc_error'));
        } else if (element.closest('.input-icon').size() === 1) {
          error.insertAfter(element.closest('.input-icon'));
        } else {
          error.insertAfter(element);
        }
      },

      submitHandler: function (form) {
        form[0].submit();
      }
    });

    $('.register-publisher-form input').keypress(function (e) {
      if (e.which == 13) {
        if ($('.register-publisher-form').validate().form()) {
          $('.register-publisher-form').submit();
        }
        return false;
      }
    });
  };

  return {
    //main function to initiate the module
    init: function () {
      handleLogin();
      handleForgetPassword();
      handleRegisterUser();
      handleRegisterPublisher();
      jQuery('#register-user-btn').click(function () {
        jQuery('.login-form').hide();
        jQuery('.register-publisher-form').hide();
        jQuery('.register-user-form').show();
      });
      jQuery('#register-publisher-btn').click(function () {
        jQuery('.login-form').hide();
        jQuery('.register-user-form').hide();
        jQuery('.register-publisher-form').show();
      });
      jQuery('#register-user-back-btn').click(function () {
        jQuery('.login-form').show();
        jQuery('.register-user-form').hide();
        jQuery('.register-publisher-form').hide();
      });
      jQuery('#register-publisher-back-btn').click(function () {
        jQuery('.login-form').show();
        jQuery('.register-user-form').hide();
        jQuery('.register-publisher-form').hide();
      });
    }

  };

}();

var options = {
  "closeButton": true,
  "debug": false,
  "positionClass": "toast-top-center",
  "onclick": null,
  "showDuration": "1000",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
};

jQuery('.register-user-form').hide();
jQuery('.register-publisher-form').hide();

jQuery(document).ready(function () {
  Login.init();
  // $('.verify-user-btn').click(handleSendSMS(e, "user"));
  $('.verify-user-btn').click(function (e) {
    handleSendSMS(e, this, "user");
  });
  $('.verify-publisher-btn').click(function (e) {
    handleSendSMS(e, this, "publisher");
  });
  $('#change-role').click(function (e) {
    e.preventDefault();
    //修改action，切换标语，按钮颜色
    if ($(".login-form").attr("action") == '/user_login') {
      $(".login-form").attr("action", "/publisher_login");
      this.innerHTML = "用户登陆";
      $("#login-btn").removeClass("red").addClass("purple");
    }
    else  {
      $(".login-form").attr("action", "/user_login");
      this.innerHTML = "发布者登陆";
      $("#login-btn").removeClass("purple").addClass("red");
    }
  });
  // $('.verify-publisher-btn').click(handleSendSMS(e, "publisher"));
});

function handleSendSMS(e, p_ele, role) {
  e.preventDefault();
  var ele = (role == "user" ? "#user_phone_num" : "#publisher_phone_num");
  // console.log(ele);
  var phone_num = $(ele).val();
  // console.log("/sendSMS?phone_num=" + phone_num);
  var verify = /^[0-9]{11}$/;
  var l = Ladda.create(p_ele);
  l.start();
  if (!verify.test(phone_num)) {
    toastr.warning("手机号码格式错误", "无法发送短信", options);
    l.stop();
    return false;
  }
  $.get("/sendSMS?phone_num=" + phone_num, function (response) {
    console.log(response);
    if (response == "success") {
      toastr.success("请查看您的手机", "发送成功", options);
    }
    else {
      toastr.warning(response, "短信发送失败", options);
    }
  })
    .always(function () {
      l.stop();
    });
  return false;
}