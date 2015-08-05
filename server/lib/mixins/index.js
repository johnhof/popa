'use strict'

import _ from 'lodash'

let mixins = require('../helpers').loadDirModules();
mixins.apply = function (config) {
  _.each(mixins, function (apply, key) {
    if (key !== 'apply') { apply(config); }
  });
}

export default mixins;
