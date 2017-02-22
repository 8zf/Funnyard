var crypto = require('crypto');

module.exports = {
  genSHA1: function (content) {
    var shasum = crypto.createHash('sha1');
    shasum.update(content);
    return shasum.digest('hex');
  }
}
