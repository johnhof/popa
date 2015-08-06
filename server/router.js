import _ from 'lodash'
import config from '../config'
import Router from 'koa-router'

export default function () {

  //
  // Register
  //

  const prefix = config.api_prefix ? '/' + config.api_prefix : '/';
  function register (routes) {
    let router = Router();
    _.each(routes, function (name='', path='') {
      path = path.indexOf('/') === 0 ? path : '/' + path;
      try {
        let ctrl = require('./components/' + name.replace(/\./g, '/'));
        if (_.isFunction(ctrl.create)) { router.post(prefix + path, ctrl.create); }
        if (_.isFunction(ctrl.read)) { router.get(prefix + path, ctrl.read); }
        if (_.isFunction(ctrl.update)) { router.put(prefix + path, ctrl.update); }
        if (_.isFunction(ctrl.destroy)) { router.delete(prefix + path, ctrl.destroy); }
      } catch (e) {
        console.log('  Failed to load controller '.red + name + '  ::  '.red + e.toString());
      }
    });
    return router.routes();
  }

  //
  // Routes
  //

  return register({
    'posts'     : 'posts',
    'posts/:id' : 'posts.post'
  });
}
