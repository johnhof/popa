'use strict'

import config from '../../../config'

export function* create () {
  let ctx = this;
  ctx.success('Create Posts');
}

export function* read () {
  let ctx = this;
  ctx.success('Read Posts');
}
