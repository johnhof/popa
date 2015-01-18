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
popa.service('Utils', ['Cookie', '$route', '$window', '$location', '$anchorScroll', 'Sizes', 'SpriteMap', function (Cookie, $route, $window, $location, $anchorScroll, Sizes, SpriteMap) {
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

    scrollTo : function (selector, duration) {

      // if the id is hash based, use the has from the url
      if (selector === 'hash') {
        selector = $location.hash();
      }

      var headerOffset = 70;
      if (!duration) {
        $anchorScroll.yOffset = headerOffset;
        $location.hash(selector);
        $anchorScroll();

      // sadly, anchorScroll doesnt support duration, well have to use Jquery
      } else {
        duration = durationMap[duration] || duration;

        $dom.find('html, body').animate({
            scrollTop: $dom.find(selector).offset().top - headerOffset
        }, duration);
      }
    },

    partial : function (name) {
      return '../views/_' + name + '.html'
    },

    sprite : function (name) {
      var sprite =  SpriteMap[name];
      return sprite ? _.clone(sprite) : null;
    },

    spriteSet: function (set) {
      return _.compact(_.map(set || [], function (name) {
        return utils.sprite(name);
      }));
    },

    //
    // State helpers
    //

    displayType : function (win) {
      return $window.innerWidth <= Sizes.mobileBreak ? 'mobile' : 'desktop'
    },

    //
    // Listener helpers
    //

    onResize : function (scope, callback) {
      var w = angular.element($window);

      scope.getWindowDimensions = function () {
        return {
          height      : $window.innerHeight,
          width       : $window.innerWidth,
          displayType : utils.displayType(w) // mobile or desktop
        };
      };

      scope.$watch(scope.getWindowDimensions, function (newSize, oldSize) {
        return callback(newSize, oldSize, newSize.displayType !== oldSize.displayType);
      }, true);

      w.bind('resize', function () {
        scope.$apply();
      });
    },

    //
    // Nav utilities
    //

    // prefix /# and redirect
    redirect : function (path) {
      path = /^\//.test(path) ? path : '/' + path
      $location.path(path);
    },

    newTab : function (url) {
      if (!url) { return; }
      $window.open(url);
    },

    reload : function () {
      $route.reload();
    }
  };

  return utils;
}])