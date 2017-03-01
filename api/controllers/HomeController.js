
module.exports = {

  testUpload: function (req, res) {
    req.file('avatar').upload({
      dirname: require('path').resolve(sails.config.appPath, 'assets/images')
    },function (err, uploadedFiles) {
      if (err) return res.negotiate(err);
      return res.json({
        message: uploadedFiles.length + ' file(s) uploaded successfully!',
        file_info: uploadedFiles
      });
    });
  }

};
