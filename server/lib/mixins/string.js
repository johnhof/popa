'use strict'

String.prototype.remove = function (match) {
  return match ? this.replace(match, '') : this;
}
