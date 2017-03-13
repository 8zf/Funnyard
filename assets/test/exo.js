var fs = require('fs')
var path = require('path')


module.exports = function (dir, cb) {
  fs.readdir(dir, function (er, files) { [1]
    if (er) return cb(er)
    var counter = files.length
    var errored = false
    var stats = []


    files.forEach(function (file, index) {
      fs.stat(path.join(dir,file), function (er, stat) { [2]
        if (errored) return
        if (er) {
          errored = true
          return cb(er)
        }
        stats[index] = stat [3]


        if (--counter == 0) { [4]
          var largest = stats
            .filter(function (stat) { return stat.isFile() }) [5]
            .reduce(function (prev, next) { [6]
              if (prev.size > next.size) return prev
              return next
            })
          cb(null, files[stats.indexOf(largest)]) [7]
        }
      })
    })
  })
}



var fs = require('fs');
var async = require('async');
var path = require('path');


module.exports = function (dir, cb) {
  async.waterfall([
    function (next) {
      fs.readdir(dir, next);
    },
    function (files, next) {
      var paths =
        files.map(function (file) { return path.join(dir,file) });
      async.map(paths, fs.stat, function (er, stats) {
        next(er, files, stats);
      })
    },
    function (files, stats, next) {
      var largest = stats
        .filter(function (stat) { return stat.isFile() })
        .reduce(function (prev, next) {
          if (prev.size > next.size) return prev;
          return next;
        });
      next(null, files[stats.indexOf(largest)])
    }
  ], cb);
};


var co = require('co')
var thunkify = require('thunkify')
var fs = require('fs')
var path = require('path')
var readdir = thunkify(fs.readdir) [1]
var stat = thunkify(fs.stat)


module.exports = co(function*(dir) {
  var files = yield readdir(dir)
  var stats = yield files.map(function (file) {
    return stat(path.join(dir, file))
  })
  var largest = stats
    .filter(function (stat) {
      return stat.isFile()
    })
    .reduce(function (prev, next) {
      if (prev.size > next.size) return prev
      return next
    })
  return files[stats.indexOf(largest)] [5]
})