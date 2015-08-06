'use strict'

import config from '../../../config'

const apiRegex = new RegExp('^\/?' + config.api_prefix)

export default function () {
  return function *(next) {
    let ctx = this;
    function respond (success, status, data) {
      if (apiRegex.test(ctx.path)) {
        ctx.status = status;
        ctx.body   = {
          success : success || false,
          status  : status || 500,
          data    : data || 'Generic Error'
        };
      } else {
        // TODO: view logic
      }
    }

    try {
      yield next;
    } catch (e) {
      respond(false, 500, 'Internal Server Error');
      console.log(e.stack);
    }

    if (!ctx.body) {
      respond(false, 404, 'Not Found');
    }
  }
}
