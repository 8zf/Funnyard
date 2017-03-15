const qiniu = require("qiniu");
const path = require('path');
const randomize = require('randomatic');

//需要填写你的 Access Key 和 Secret Key
qiniu.conf.ACCESS_KEY = '31ULV4j3DA9p76IcvH3ZC3PrIgqXIh3EX8VMpvmD';
qiniu.conf.SECRET_KEY = 'n_aGzUV1G3XdCXLc2abMD62IKS9ZDvKf7fFr_Mtt';
//要上传的空间
bucket = 'funnyard';

//上传到七牛后保存的文件名
// key = randomize('*', 3) + '.png';

//构建上传策略函数，设置回调的url以及需要回调给业务服务器的数据
function uptoken(bucket, key) {
  var putPolicy = new qiniu.rs.PutPolicy(bucket + ":" + key);
  // putPolicy.callbackUrl = 'http://your.domain.com/callback';
  // putPolicy.callbackBody = 'filename=$(fname)&filesize=$(fsize)';
  return putPolicy.token();
}

//生成上传 Token
// token = uptoken(bucket, key);

//要上传文件的本地路径
filedir = path.resolve(sails.config.appPath, 'assets/images/temp');
// filePath = './nodejs-logo.png';

//构造上传函数
function uploadFile(uptoken, key, localFile, callback) {
  var extra = new qiniu.io.PutExtra();
  qiniu.io.putFile(uptoken, key, localFile, extra, callback);
}

module.exports = {

  uploadIcon: function (req, res) {
    //截取头像的属性值
    var crop_data = eval('(' + req.param('avatar_data') + ')');
    var width = crop_data.width;
    var height = crop_data.height;
    var x_offset = crop_data.x;
    var y_offset = crop_data.y;

    //上传到七牛后保存的文件名
    var key = randomize('*', 5) + '.png';
    //头像具体路径，包括裁剪参数
    var img_path;
    //生成上传 Token
    var token = uptoken(bucket, key);

    //用户还是发布者
    var role = (req.session.role == 'user' ? User : Publisher);

    if (req.param('have_file') == "true") {
      // console.log('yes have_file');
      req.file('avatar_file').upload({dirname: filedir, saveAs: key}, function (err, uploadedFiles) {
        if (err) {
          return res.serverError(err);
        }
        // console.log(uploadedFiles[0].filename);
        // return res.send("see..");
        //调用uploadFile上传
        uploadFile(token, key, path.join(filedir, key), function (err, ret) {
          if (!err) {
            // 上传成功， 处理返回值
            img_path = 'http://image.funnyard.com/' + ret.key + '?imageMogr2/crop/!' + width + 'x' + height + 'a' + x_offset + 'a' + y_offset;
            console.log("上传成功");
            console.log('http://image.funnyard.com/' + ret.key);
            role.findOne(req.session.userid).exec(function (err, record) {
              if (err) {
                console.log(err);
                return res.serverError(err);
              }
              record.Icon = img_path;
              // + '?imageMogr2/crop/!' + width + 'x' + height + 'a' + x_offset + 'a' + y_offset
              record.save(function (err) {
                if (err) {
                  console.log(err);
                  return res.send(err);
                }
                console.log("保存数据库成功");
                req.session.icon = img_path;
                return res.json({
                  result: img_path,
                  message: '图片上传成功'
                });
              });
            });
          }
          else {
            // 上传失败， 处理返回代码
            console.log(err);
            return res.json({
              message: "上传七牛云失败"
            });
          }
        });
      });
    }
    else {
      // console.log('not have_file');
      img_path = req.param('avatar_src') + '?imageMogr2/crop/!' + width + 'x' + height + 'a' + x_offset + 'a' + y_offset;
      role.findOne(req.session.userid).exec(function (err, record) {
        if (err) {
          console.log(err);
          return res.serverError(err);
        }
        record.Icon = img_path;
        // + '?imageMogr2/crop/!' + width + 'x' + height + 'a' + x_offset + 'a' + y_offset
        record.save(function (err) {
          if (err) {
            console.log(err);
            return res.send(err);
          }
          console.log("修改数据库成功");
          req.session.icon = img_path;
          res.json({
            result: img_path,
            message: '图片上传成功'
          });
        });
      });
    }
  },

  uploadCover: function (req, res) {
//截取头像的属性值
    var crop_data = eval('(' + req.param('avatar_data') + ')');
    var width = crop_data.width;
    var height = crop_data.height;
    var x_offset = crop_data.x;
    var y_offset = crop_data.y;

    //上传到七牛后保存的文件名
    var key = randomize('*', 5) + '.png';
    //头像具体路径，包括裁剪参数
    var img_path;
    //生成上传 Token
    var token = uptoken(bucket, key);

    //用户还是发布者
    var role = (req.session.role == 'user' ? User : Publisher);

    if (req.param('have_file') == "true") {
      // console.log('yes have_file');
      req.file('avatar_file').upload({dirname: filedir, saveAs: key}, function (err, uploadedFiles) {
        if (err) {
          return res.serverError(err);
        }
        // console.log(uploadedFiles[0].filename);
        // return res.send("see..");
        //调用uploadFile上传
        uploadFile(token, key, path.join(filedir, key), function (err, ret) {
          if (!err) {
            // 上传成功， 处理返回值
            img_path = 'http://image.funnyard.com/' + ret.key + '?imageMogr2/crop/!' + width + 'x' + height + 'a' + x_offset + 'a' + y_offset;
            console.log("上传成功");
            console.log('http://image.funnyard.com/' + ret.key);
            return res.json({
              result: img_path,
              message: '图片上传成功'
            });
          }
          else {
            // 上传失败， 处理返回代码
            console.log(err);
            return res.json({
              message: "上传七牛云失败"
            });
          }
        });
      });
    }
    else {
      // console.log('not have_file');
      img_path = req.param('avatar_src') + '?imageMogr2/crop/!' + width + 'x' + height + 'a' + x_offset + 'a' + y_offset;
      res.json({
        result: img_path,
        message: '图片上传成功'
      });
    }
  }
};