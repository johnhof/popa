'use strict'

import config from '../../../config'
import GitHubApi from 'github'

export default function () {
  let github = new GitHubApi(config.github.settings);
  github.authenticate(config.github.auth);


  //
  // Generators
  //


  return function *(next) {
    var ctx = github;
    yield next;
  }
}
