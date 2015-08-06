'use strict'

import config from '../../../../config'

export function* read () {
  let ctx = this;
  ctx.success('Read Post');
}

export function* update () {
  let ctx = this;
  ctx.success('Update Post');
}

export function* destroy () {
  let ctx = this;
  ctx.success('Destroy Post');
}
