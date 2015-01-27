var _   = require('lodash');
var Joi = require('joi');

// simple model generation helper
function Model (schema) {
  this.data = {};
  this.schema = schema || {};
}
// Model.prototype = { constructor : Model };


// add properties to object
//
Model.prototype.add = function (obj) {
  this.data = _.defaults(obj, this.data);
}

// vlaiadte the current object against the schema
//
Model.prototype.validate = function (callback) {
  return joi.validate(this.data, this.schema, function (error, value) {
    if (error) {
      error = {
        error   : 'Response did not fit schema',
        details : error
      };
    }

    return callback(error, value);
  });
}


module.exports = Model;