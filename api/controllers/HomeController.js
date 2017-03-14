
module.exports = {

  testUpload: function (req, res) {
    console.log("???!!!");
    return res.send("qwertyuiop");
    // req.file('avatar').upload({
    //   dirname: require('path').resolve(sails.config.appPath, 'assets/images')
    // },function (err, uploadedFiles) {
    //   if (err) return res.negotiate(err);
    //   return res.json({
    //     message: uploadedFiles.length + ' file(s) uploaded successfully!',
    //     file_info: uploadedFiles
    //   });
    // });
  }

};
