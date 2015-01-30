//
// Prototype additions
//

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}


_.findValue = function (obj, namespace, defaultValue) {
  if (!obj) { return defaultValue; }

  var keys = namespace.split('.').reverse();
  while (keys.length && (obj = obj[keys.pop()]) !== undefined) {}

  return (typeof obj !== 'undefined' ? obj : defaultValue);
}

jQuery.fn.outerHtml = function() {
  return jQuery('<div/>').append(this.eq(0).clone()).html();
}