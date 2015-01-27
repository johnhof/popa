//
// middleware error handler
//
module.exports = function (error, req, res, next) {
  res.status(err.status || 400).send({
    error   : err.error || 'Could not process request',
    details : err.details || null
  });
}