jQuery.validator.addMethod("isRegularString", function (value, element, param) {
  var ver = /^[\u4E00-\u9FA5\uF900-\uFA2Da-zA-Z0-9]{3,100}$/;
  return ver.test(value);
}, $.validator.format("不能包含符号"));
var FormWizard = function () {

  return {
    //main function to initiate the module
    init: function () {
      if (!jQuery().bootstrapWizard) {
        return;
      }

      function format(state) {
        if (!state.id) return state.text; // optgroup
        return "<img class='flag' src='../../assets/global/img/flags/" + state.id.toLowerCase() + ".png'/>&nbsp;&nbsp;" + state.text;
      }

      // $("#country_list").select2({
      //   placeholder: "Select",
      //   allowClear: true,
      //   formatResult: format,
      //   width: 'auto',
      //   formatSelection: format,
      //   escapeMarkup: function (m) {
      //     return m;
      //   }
      // });

      var form = $('#submit_form');
      var error = $('.alert-danger', form);
      var success = $('.alert-success', form);

      form.validate({
        doNotHideMessage: true, //this option enables to show the error/success messages on tab switch.
        errorElement: 'span', //default input error message container
        errorClass: 'help-block help-block-error', // default input error message class
        focusInvalid: false, // do not focus the last invalid input
        rules: {
          //step 1
          theme: {
            isRegularString: true,
            required: true
          },
          hold_date: {
            required: true
          },
          hold_time: {
            required: true
          },
          end_date: {
            required: true
          },
          end_time: {
            required: true
          },
          maxnum: {
            required: true
          },
          //step 2
          location: {
            isRegularString: true,
            required: true
          },
          locationlng: {
            required: true
          },
          locationlat: {
            required: true
          },
          //step 3
          content: {
            required: true
          }
        },

        messages: { // custom messages for radio buttons and checkboxes

        },

        errorPlacement: function (error, element) { // render error placement for each input type
          // if (element.attr("name") == "gender") { // for uniform radio buttons, insert the after the given container
          //   error.insertAfter("#form_gender_error");
          // } else if (element.attr("name") == "payment[]") { // for uniform checkboxes, insert the after the given container
          //   error.insertAfter("#form_payment_error");
          // } else {
          //   error.insertAfter(element); // for other inputs, just perform default behavior
          // }
        },

        invalidHandler: function (event, validator) { //display error alert on form submit
          success.hide();
          error.show();
          App.scrollTo(error, -200);
        },

        highlight: function (element) { // hightlight error inputs
          $(element)
            .closest('.form-group').removeClass('has-success').addClass('has-error'); // set error class to the control group
        },

        unhighlight: function (element) { // revert the change done by hightlight
          $(element)
            .closest('.form-group').removeClass('has-error'); // set error class to the control group
        },

        success: function (label) {
          if (label.attr("for") == "gender" || label.attr("for") == "payment[]") { // for checkboxes and radio buttons, no need to show OK icon
            label
              .closest('.form-group').removeClass('has-error').addClass('has-success');
            label.remove(); // remove error label here
          } else { // display success icon for other inputs
            label
              .addClass('valid') // mark the current input as valid and display OK icon
              .closest('.form-group').removeClass('has-error').addClass('has-success'); // set success class to the control group
          }
        }

        // submitHandler: function (form) {
        //   console.log("submit handler emitted");
        //   success.show();
        //   error.hide();
        //   form.submit();
        //   //add here some ajax code to submit your form or just call form.submit() if you want to submit the form without ajax
        // }

      });

      var displayConfirm = function () {
        $('#tab4 .form-control-static', form).each(function () {
          var input = $('[name="' + $(this).attr("data-display") + '"]', form);
          if (input.is(":radio")) {
            input = $('[name="' + $(this).attr("data-display") + '"]:checked', form);
          }
          if (input.is(":text") || input.is("textarea")) {
            $(this).html(input.val());
          } else if (input.is("select")) {
            $(this).html(input.find('option:selected').text());
          } else if (input.is(":radio") && input.is(":checked")) {
            $(this).html(input.attr("data-title"));
          } else if ($(this).attr("data-display") == 'payment[]') {
            var payment = [];
            $('[name="payment[]"]:checked', form).each(function () {
              payment.push($(this).attr('data-title'));
            });
            $(this).html(payment.join("<br>"));
          }
        });
      }

      var handleTitle = function (tab, navigation, index) {
        var total = navigation.find('li').length;
        var current = index + 1;
        // set wizard title
        $('.step-title', $('#form_wizard_1')).text('Step ' + (index + 1) + ' of ' + total);
        // set done steps
        jQuery('li', $('#form_wizard_1')).removeClass("done");
        var li_list = navigation.find('li');
        for (var i = 0; i < index; i++) {
          jQuery(li_list[i]).addClass("done");
        }

        if (current == 1) {
          $('#form_wizard_1').find('.button-previous').hide();
        } else {
          $('#form_wizard_1').find('.button-previous').show();
        }

        if (current >= total) {
          $('#form_wizard_1').find('.button-next').hide();
          $('#form_wizard_1').find('.button-submit').show();
          displayConfirm();
        } else {
          $('#form_wizard_1').find('.button-next').show();
          $('#form_wizard_1').find('.button-submit').hide();
        }
        App.scrollTo($('.page-title'));
      }

      // default form wizard
      $('#form_wizard_1').bootstrapWizard({
        'nextSelector': '.button-next',
        'previousSelector': '.button-previous',
        onTabClick: function (tab, navigation, index, clickedIndex) {
          // return false;

          success.hide();
          error.hide();
          if (form.valid() == false) {
            return false;
          }

          handleTitle(tab, navigation, clickedIndex);
        },
        onNext: function (tab, navigation, index) {
          success.hide();
          error.hide();

          if (form.valid() == false) {
            return false;
          }

          handleTitle(tab, navigation, index);
        },
        onPrevious: function (tab, navigation, index) {
          success.hide();
          error.hide();

          handleTitle(tab, navigation, index);
        },
        onTabShow: function (tab, navigation, index) {
          var total = navigation.find('li').length;
          var current = index + 1;
          var $percent = (current / total) * 100;
          $('#form_wizard_1').find('.progress-bar').css({
            width: $percent + '%'
          });
        }
      });

      $('#form_wizard_1').find('.button-previous').hide();
      // $('#form_wizard_1 .button-submit').click(function () {
      //   $('#form_wizard_1').submit(console.log("活动已提交"));
      // }).hide();

      //apply validation on select2 dropdown value change, this only needed for chosen dropdown integration.
      $('#country_list', form).change(function () {
        form.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
      });
    }

  };

}();

var map, zoom = 16, isexit = false;

//鼠标在地图上按下左键时添加一个点标记
function mouseup(point) {
  if (isexit == false) {
    marker = new TMarker(point);
    map.addOverLay(marker);
//                alert(point.getLng() + ', ' + point.getLat());
    markerTool.close();
    marker.enableEdit();
    isexit = true;
    var location = marker.getLngLat();
//      document.getElementById('content').value = content_;
    document.getElementById('locationlng').value = location.getLng();
    document.getElementById('locationlat').value = location.getLat();
  }
  else {
  }
}

//初始化地图对象
map = new TMap("mapDiv");
//设置显示地图的中心点和级别
map.centerAndZoom(new TLngLat(121.4986695687, 31.2801283584), zoom);
//允许鼠标双击放大地图
map.enableHandleMouseScroll();

//创建标注工具对象
var markerTool = new TMarkTool(map);
//注册标注的mouseup事件
TEvent.addListener(markerTool, "mouseup", mouseup);
$("#marker-btn").click(markerTool.open());

<!-- 实例化编辑器 -->
var ue = UE.getEditor('container', {});

jQuery(document).ready(function () {
  FormWizard.init();
});

