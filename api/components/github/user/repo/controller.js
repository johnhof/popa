var mon        = require('mongoman');
var GitGrabber = require(process.cwd() + '/api/lib/gitGrabber');

module.exports = function (server) {
  //
  // CRUD handlers
  //
  return {

    // Read
    //
    read : function (req, res, next) {
      var grabber = GitGrabber(server, next);

      mon.model('Repo').findOne({
        full_name  : req.params.user + '/' + req.params.repo
      }, function (error, result) {

        if (error) {
          return next(error);

        // if we have a cached version, return it
        } else if (result) {
          return res.status(200).json(result);

        // if there isn a cached version, request and cache one
        } else {
          grabber.updateRepo(req, res, function (error, result) {
            if (error) {
              return next(error);
            } else {
              res.sendJson(result);
            }
          });
        }
      });
    },

    // Update
    //
    update : function (req, res, next) {
      var grabber = GitGrabber(server, next);

      grabber.updateRepo(req, res, function (error, result) {
        if (error) {
          return next(error);
        } else {
          res.sendJson(result);
        }
      });
    }
  };
}