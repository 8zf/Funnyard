/**
 * PublisherController
 *
 * @description :: Server-side logic for managing Publishers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const path = require('path');
// const ueditor = require("ueditor");
// const ueditor_options = ueditorQiniuConfigService.options;
const randomstring = require("randomstring");
const moment = require('moment');
const uuidV4 = require('uuid/V4');

module.exports = {

  register: function (req, res) {
    res.view('login', {
      title: "成为发布者",
      layout: false
    });
  },

  add: function (req, res) {
    var publisher_code = req.param('publisher_code');
    var userid = req.param('userid');
    var password = req.param('password');
    var phone_num = req.param('phone_num');
    var email = req.param('email');
    var name = req.param('name');
    var verify_code = req.param('verify_code');
    //检查注册码是否可用
    //手机号码是否已注册
    //验证码是否正确
    PublisherCode.find({Code: publisher_code}).exec(function (err, records1) {
      if (err) {
        return res.send(err);
      }
      if (records1.length == 0) {
        console.log('注册码无效');
        return res.send('注册码无效');
      }
      if (records1[0].IsUsable == 0)
      {
        console.log('注册码已被使用');
        return res.send('注册码已被使用');
      }
      //注册码正确
      Publisher.find({PhoneNum: phone_num}).exec(function (err, records2) {
        if (err) {
          return res.send(err)
        }
        if (records2.length > 0) {
          console.log('手机号码已被注册');
          return res.send("手机号码已被注册");
        }
        VerifyPhone.find({PhoneNum: phone_num}).exec(function (err, records3) {
          if (err) {
            return res.send(err);
          }
          if (records3.length == 0)
          {
            console.log('验证码错误');
            return res.send("验证码错误");
          }
          if (records3[0].VerifyCode == verify_code && (new Date().getTime()) < parseInt(records3[0].ExpireAt)) {
            console.log('正确，可以录入，将注册码改为已使用');
            //正确，可以录入，将注册码改为已使用
            var new_record = {
              PublisherID: uuidV4(),
              Email: email,
              NickName: userid,
              PassWd: EncryptionService.genSHA1(password),
              Department: name,
              PhoneNum: phone_num
            };
            Publisher.create(new_record).exec(function (err, record4) {
              if (err) {
                return res.send(err);
              }
              PublisherCode.update({Code: publisher_code}, {IsUsable: 0, PublisherID: new_record.PublisherID}).exec(function (err, record5) {
                if (err) {
                  //回滚？
                  console.log("修改注册码出错");
                  console.log(err);
                  Publisher.destroy(record4).exec(function (err, record) {
                    if (err) {
                      console.log('回滚失败');
                      return res.send("回滚失败");
                    }
                    console.log('操作回滚成功，注册失败');
                    return res.send("操作回滚成功，注册失败");
                  });
                }
                //注册成功，重定向
                return res.redirect('/login');
              });
            });
          }
          else {
            console.log('验证码错误');
            return res.send("验证码错误");
          }

        });
      });
    });
  }

  // getProfile: function (req, res) {
  //
  // },
  //
  // getPublishedActivities: function (req, res) {
  //
  // }

  // publish: function (req, res) {
  //   return res.view('publisher/publish');
  // },
  //
  // getQiniu: function (req, res, next) {
  //   // return res.send('???');
  //   var params = req.query;
  //
  //   var action = params['action'];
  //   console.log(action);
  //   if (action == 'config') {
  //     res.send(ueditor_options.ueditorConfig);
  //   }
  //   else if (action == 'listimage' || action == 'listfile') {
  //     var start = parseInt(params['start'] || 0);
  //     var size = parseInt(params['size'] || 10);
  //
  //     var storeParams = {
  //       prefix: action == 'listimage' ? 'image/' : 'file/',
  //       start: start,
  //       limit: size
  //     };
  //
  //     storeqiniuStoreServioce.listQiniu(storeParams, function (err, ret) {
  //       res.send(ret);
  //       return next();
  //     })
  //
  //   } else {
  //     res.send();
  //   }
  //
  //   return next();
  // },
  //
  // postQiniu: function (req, res, next) {
  //   var params = req.query;
  //
  //   var action = params['action'];
  //
  //   var key = '/' + moment().format('YYYYMMDD') + '/' + (+new Date()) + randomstring.generate(6);
  //
  //   switch (action) {
  //     case 'uploadvideo':
  //       key = 'video' + key;
  //       break;
  //     case 'uploadfile':
  //       key = 'file' + key;
  //       break;
  //     default:
  //       key = 'image' + key;
  //       break;
  //   }
  //
  //   var storeParams = {};
  //
  //   if (action == 'uploadimage' || action == 'uploadvideo' || action == 'uploadfile') {
  //     req.file('upfile').upload({dirname: require('path').resolve(sails.config.appPath, 'assets/images/temp')}, function (err, uploadedFiles) {
  //       if (err) return res.send(err);
  //       // console.log(uploadedFiles[0]);
  //       if (action == 'uploadfile') {
  //         key += '/' + uploadedFiles[0].filename;
  //       }
  //       storeParams = {
  //         key: key,
  //         filePath: uploadedFiles[0].fd,
  //         fileName: uploadedFiles[0].filename
  //       };
  //       qiniuStoreService.fileToQiniu(storeParams, function (err, ret) {
  //         return res.send(ret);
  //         // return next();
  //       });
  //     });
  //   }
  //   else if (action == 'uploadscrawl') {
  //     //这里不能用
  //     var data = params['upfile'];
  //     if (!data) {
  //       res.send();
  //       return next();
  //     }
  //
  //     storeParams = {
  //       key: key,
  //       data: new Buffer(data, 'base64')
  //     };
  //
  //     storeqiniuStoreServioce.dataToQiniu(storeParams, function (err, ret) {
  //       res.send(ret);
  //       return next();
  //     })
  //   }
  // },
  //
  // ueditor: ueditor('/home/zhang/Desktop/funnyard-on-sails/funnyard/assets', function (req, res, next) {
  //
  //   console.log(req.param("action"));
  //   // ueditor 客户发起上传图片请求
  //   if (req.param("action") === 'uploadimage') {
  //
  //     // 这里你可以获得上传图片的信息
  //     var foo = req.ueditor;
  //     console.log(foo.filename); // exp.png
  //     console.log(foo.encoding); // 7bit
  //     console.log(foo.mimetype); // image/png
  //
  //     // 下面填写你要把图片保存到的路径 （ 以 path.join(__dirname, 'public') 作为根路径）
  //     var img_url = '/images';
  //     res.ue_up(img_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
  //   }
  //
  //   //  客户端发起图片列表请求
  //   else if (req.param("action") === 'listimage') {
  //     var dir_url = '/images'; // 要展示给客户端的文件夹路径
  //     res.ue_list(dir_url); // 客户端会列出 dir_url 目录下的所有图片
  //   }
  //
  //   // 客户端发起其它请求
  //   else {
  //     res.setHeader('Content-Type', 'application/json');
  //
  //     // 这里填写 ueditor.config.json 这个文件的路径
  //     res.redirect('/ueditor/nodejs/config.json')
  //   }
  // })
};

