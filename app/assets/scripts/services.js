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
  var durationMap = {
    slow     : 2000,
    standard : 1000,
    fast     : 500
  }
  var utils = {

    //
    // Miscellaneous utilities
    //

    setHash : function (id) {
      location.hash(id);
    },

    scrollTo : function (id, duration) {
      if (id === 'hash') {
        id = $location.hash();
      }

      var headerOffset = 70;
      if (!duration) {
        $anchorScroll.yOffset = headerOffset;
        $location.hash(id);
        $anchorScroll();

      //dadly, anchorScroll doesnt support duration, well have to use Jquery
      } else {
        duration = durationMap[duration] || duration;

        $dom.find('html, body').animate({
            scrollTop: $dom.find('#' + id).offset().top + headerOffset
        }, duration);
      }
    },
    // prefix /# and redirect

    redirect : function (path) {
      path = /^\//.test(path) ? path : '/' + path
      $location.path(path);
    },

    reload : function () {
      $route.reload();
    }
  };

  return utils;
}])