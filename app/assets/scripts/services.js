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
      if (!id) { return; }

      id = id.replace(/^#/, '')
      var hashRegex = /^(#.+?)#.*$/;
      var hash = _.clone(location.hash);

      if (hashRegex.test(location.hash)) {
        hash = hash.replace(hashRegex, '$1#' + id);

      } else {
        hash += '#' + id;
      }

      history.pushState(null, null, hash);
    },

    scrollTo : function (selector, duration) {

      // if the id is hash based, use the has from the url
      if (selector === 'hash') {
        selector = $location.hash();
      } else if (selector === 'top') {
        selector = null;
      }

      var headerOffset = 70;
      if (!duration) {
        $anchorScroll.yOffset = headerOffset;
        $anchorScroll();

      // sadly, anchorScroll doesnt support duration, well have to use Jquery
      } else {
        duration = durationMap[duration] || duration;

        $dom.find('html, body, #main-content').animate({
            scrollTop: selector ? $dom.find(selector).offset().top - headerOffset : 0
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


// A collection of general purpose utilities
popa.service('FormHelper', [function () {
  return function (formObj, dataModel) {
    var $form = angular.element('form[name=' + formObj.$name + ']');
    var form  = {
      // validate and perform passed in action
      apiAction : function (inputs, resourceReq, onSuccess) {
        formObj.submitted = true;

        if (form.validate()) {
          resourceReq(inputs, onSuccess, form.resErrHandler);
        }
      },

      // validate by pairing visible inputs with their angular model counterparts to find validation errors
      validate : function () {
        var inputsArr = form.visibleInputs();
        var valErrors;

        // only validate visible inputs
        _.each(inputsArr, function ($input) {
          var angInput = formObj[$input.attr('name')]; // pair name to angular input obj
          if (angInput && Object.keys(angInput.$error || {}).length) {
            valErrors =  true;
          }
        });

        return !valErrors;
      },

      visibleInputs : function () {
        return _.compact($form.find('input[ng-show]:not(.ng-hide), input:not([ng-show])').map(function () {
          var $input = $(this);
          // make sure our parent isnt hidden either
          if (!$input.closest('[ng-show].ng-hide').length) { return $input; }
        }));
      },

      // error handler which appends api errors to the form
      resErrHandler : function (apiError) {
        var errorObj = _.defaults(apiError.data || {}, {
          error   : 'Failed to complete action',
          details : []
        });

        // if its a validation error, set the error text for each problem input
        if (errorObj.error === 'ValidationError') {
          _.each(errorObj.details, function (valError) {
            if (!(valError && valError.path && valError.message)) { return; }
            var $input = $dom.find('.error[data-matches="' + valError.path + '"], .error[data-matches="inputs.' + valError.path + '"], .error[data-matches="fomr.' + valError.path + '"]');
            $input.text(valError.message.capitalize());
          });

        // if its not a validation error, just display add the error to the form
        } else {
          formObj.globalError = errorObj.error;
        }
      },
    }

    return form;
  }
}]);