/**
 * Created by zhang on 2/19/17.
 */
// var App = require('co-alidayu');
var App = require('alidayu-node');
var app = new App('23632391', '390ec7ef515d368c940e3e2b996ae82f');
var co = require('co');

module.exports = {
  sendVerifyCode: function (options, callback) {
    // console.log('yooooooo');
    // console.log(options);
    // var config = {
    //   extend: "",
    //   sms_free_sign_name: "趣往",
    //   sms_param: {"verify_code": options.code},
    //   rec_num: options.rec_num,
    //   sms_template_code: 'SMS_46545011'
    // };
    // co(function *() {
    //   var result = yield app.send_sms(config);
    //   console.log("result in SMSService.js");
    //   console.log(result);
    //   return result;
    // }).catch((err) => {
    //   return err;
    // });

    app.smsSend({
      sms_free_sign_name: '趣往',
      sms_param: {"verify_code": options.code},
      rec_num: options.rec_num,
      sms_template_code: 'SMS_46545011'
    }, callback);
    // function (response) {
    //   if (!reregisponse) {
    //     console.log('no response');
    //     return true;
    //   }
    //   else {
    //     console.log('response: ');
    //     console.log(response);
    //     return response;
    //   }
    // }
  }
};
