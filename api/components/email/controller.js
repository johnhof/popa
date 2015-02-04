var nodemailer = require('nodemailer');
var validate   = require(process.cwd() + '/api/lib/validate');
var Joi        = require('joi');

module.exports = function (server) {
  var transporter = nodemailer.createTransport();

  //
  // CRUD handlers
  //
  return {

    // Create
    //
    create : function (req, res, next) {
      validate(req.body, {
        email   : Joi.string().required().email(),
        subject : Joi.string().required(),
        name    : Joi.string().required(),
        message : Joi.string().required(),
      }, function success (inputs, callback) {
        transporter.sendMail({
          to      : server.config.email.target,
          from    : inputs.email,
          subject : inputs.name + '-' + inputs.subject,
          text    : inputs.message
        }, function (error, info) {
          if (error) {
            return next(error);
          } else {
            res.success();
          }
        });
      }, next);
    }
  };
}