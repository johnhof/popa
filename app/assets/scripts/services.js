//
// Global Services
//




////////////////////////////////////////////////////////////////////////
//
//  Session related service
//
////////////////////////////////////////////////////////////////////////

// Parse a cookie and return tit as a JS object, defaulting to {} if the JSON cannot be parsed
popa.service('Cookie', [function () {
  return function (cookieName, value) {
    if (value) {
      $.cookie(cookieName, value);
    } else {
      var result;

      var cookie = $.cookie(cookieName);
      if (cookie) {
        try {
            result = JSON.parse(cookie.replace(/^j:/, ''));
        } catch (e) {
          console.error(e);
          result = null;
        }
      }

      return result;
    }
  }
}]);




////////////////////////////////////////////////////////////////////////
//
//  Utilities service
//
////////////////////////////////////////////////////////////////////////

// A collection of general purpose utilities
popa.service('Utils', ['Cookie', '$route', '$window', '$location', '$anchorScroll', function (Cookie, $route, $window, $location, $anchorScroll) {
  var $dom = angular.element('html');
  return {

    //
    // Miscellaneous utilities
    //

    scrollTo : function (id) {
      $location.hash(id);
      $anchorScroll();
    },
    // prefix /# and redirect

    redirect : function (path) {
      path = /^\//.test(path) ? path : '/' + path
      $location.path(path);
    },

    reload : function () {
      $route.reload();
    }
  }
}])