'use strict'

import fs from 'fs'
import _ from 'lodash'

export function loadDirModules (dir) {
  let modules = {};
  dir         = dir || (module.parent.filename.match(/(.*\/).*\.js/) || [])[1] || process.cwd();
  dir         = /\/$/.test(dir) ? dir : dir + '/';
  let files   = fs.readdirSync(dir);
  _.each(files, function (file) {
    if (file.match(/\.js$/) !== null && file !== 'index.js') {
      let filename      = file.replace('.js', '');
      modules[filename] = require(dir + file)
    }
  });

  return modules;
}
