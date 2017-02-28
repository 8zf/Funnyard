module.exports = {
  verify: function (phone_num, verify_code, callback) {
    VerifyPhone.find({PhoneNum: phone_num}).exec(function (err, record) {
      if (err) {
        console.log(err);
        return res.send(err);
      }
      if (record[0].VerifyCode == req.param('verify_code') && (new Date().getTime()) < parseInt(record[0].ExpireAt)) {
        //verified successfully

      }
      else {
        return res.send("验证码错误或已失效");
      }
    });
  }
};