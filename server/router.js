import _ from 'lodash'
import config from '../config'

export default function () {

  //
  // Register
  //

  const prefix = config.api_prefix ? config.api_prefix + '/' : '';
  function register () {
    _.each(routes, function (path='', name='') {
      try {
        let ctrl = require('../components/' + name.replace(/./g, '/'));
        if (_.isFunction(ctrl.create)) { router.post(prefix + '/' + path, ctrl.create); }
        if (_.isFunction(ctrl.read)) { router.get(prefix + '/' + path, ctrl.read); }
        if (_.isFunction(ctrl.update)) { router.put(prefix + '/' + path, ctrl.update); }
        if (_.isFunction(ctrl.destroy)) { router.delete(prefix + '/' + path, ctrl.destroy); }
      } catch (e) {
        console.log('  Failed to load controller '.red + name + '  ::  ' + e);
      }
    });
    return router.middleware();
  }

  //
  // Routes
  //

  return register({
    '/posts'     : 'posts',
    '/posts/:id' : 'posts.post'
  });
}
