
import EventEmitter from 'event-emitter'
import defaults from 'lodash/defaults';
import each from 'lodash/each';
import map from 'lodash/map';

export const DEFUALT_BOUNDS = {
  small: 600,
  medium: 1200,
  large: Infinity
}

export default class MediaQuery {
  constructor (config={}) {
    this.width;
    this.size      = {};
    this.emitter   = EventEmitter();
    this.bound     = {};
    this.bound.map = defaults(config, DEFUALT_BOUNDS);
    this.bound.set = map(this.bound.map, (bound, name) => {
      return { name, bound };
    }).sort((a, b) => (a.bound - b.bound));
  }

  get width () {
    return window && window.innerWidth;
  }

  on (...args) {
    this.emitter.on.apply(this.emitter, args);
  }

  getSizeForWidth (width) {
    let result = -1;
    each(this.bound.set, (size) => {
      result = size;
      if (size.bound > width) return false;
    });
    return result;
  }

  refresh () {
    let newSize = this.getSizeForWidth(this.width);
    if (this.size.name !== newSize.name) {
      this.size = newSize;
      this.emitter.emit(this.size.name);
    }
  }
}
