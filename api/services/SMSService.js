/**
 * Created by zhang on 2/19/17.
 */
var App = require('alidayu-node');
var app = new App('23632391', '390ec7ef515d368c940e3e2b996ae82f');
module.exports = {
  sendVerifyCode: function (options) {
    app.smsSend({
      sms_free_sign_name: '趣往',
      sms_param: {"verify_code": options.code},
      rec_num: options.rec_num,
      sms_template_code: 'SMS_46545011'
    }, function (error, response) {
      if (!error) {
        // console.log(response);
        return true;
      }
      else {
        console.log(error);
        return error;
      }
    });
  }
};
