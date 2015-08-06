'use strict'

import config from '../../../config'
import _ from 'lodash'

export default function () {
  return function *(next) {
    let ctx = this;

    ctx.respond = function (success, status, data) {
      ctx.status = status || 500;
      ctx.body   = {
        success : success || false,
        status : status || 500,
        data   : data || 'Generic Error'
      };
    }

    ctx.success = function (msg = 'OK') {
      ctx.respond(true, 200, msg);
    }

    ctx.failure = function () {
      if (_.isString(arguments[0])) {
        ctx.respond(false, 400, arguments[0]);
      } else {
        ctx.respond(false, rguments[0], arguments[1]);
      }
    }

    yield next;
  }
}
