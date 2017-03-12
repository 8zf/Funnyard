/**
 * TestController
 *
 * @description :: Server-side logic for managing tests
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	upload: function (req, res) {
    req.file('avatar_file').upload({
      dirname: require('path').resolve(sails.config.appPath, 'assets/images')
    },function (err, uploadedFiles) {
      if (err) {
        console.log("upload file error");
        console.log(err);
        return res.negotiate(err);
      }
      console.log('upload success');
      // return res.ok();
      return res.json({
        result: 'http://image.funnyard.com/',
        message: uploadedFiles.length + ' file(s) uploaded successfully!',
        file_info: uploadedFiles
      });
    });
  }
};

