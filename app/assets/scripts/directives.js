//
// Global Directives
//




////////////////////////////////////////////////////////////////////////
//
//  Aesthetic Directives
//
////////////////////////////////////////////////////////////////////////

//
// add a sprite from the sprite sheet
popa.directive('sprite', ['Utils', function (Utils) {
  return {
    restrict : 'E',
    replace  : true,
    scope    : {
      href : '@',
      name : '@'
    },
    template : '<span class="sprite {{name}} size-{{size}}" ng-click="spriteTab(href)"></span>',
    link     : function (scope, element, attrs) {
      scope.href = attrs.href;
      scope.name = attrs.name;
      scope.size = attrs.size || '32';

      scope.spriteTab = Utils.newTab;
    }
  };
}]);

//
// partial width divider
popa.directive('divider', [function () {
  return {
    restrict : 'E',
    replace  : true,
    template : '<div class="divider"><span></span></div>',
  };
}]);

//
// small diamond div
popa.directive('diamond', [function () {
  return {
    restrict : 'E',
    replace  : true,
    template : '<div class="diamond"><span>◆</span></div>',
  };
}]);

//
// transclude inside vertical centered table cell
popa.directive('center', [function () {
  return {
    restrict   : 'EA',
    replace    : true,
    transclude : true,
    template   : '<div class="vertical-center-outer"><div class="vertical-center-inner"><ng-transclude></ng-transclude></div></div>',
  };
}]);

//
// Mongoman logo
popa.directive('mongoman', [function () {
  return {
    restrict : 'E',
    replace  : true,
    template : '<div class="mongoman-logo"><span class="triangle"></span><span class="leading">M</span><span class="trailing">M</span></div>',
  };
}]);


//
// set the height to match the port
popa.directive('full-port-height', ['$window', function ($window) {
  return function (scope, element, attr) {
    //
    // TODO: fix me
    //

    scope.onResize = function() {
      var headerHeight = (document.getElementById('nav-header')[0] || {}).height;
      $(element).height($window.innerHeight - headerHeight);
    }

    scope.onResize();
    angular.element($window).bind('resize', function() {
      scope.onResize();
    })
  };
}]);


//
// add a sprite from the sprite sheet
popa.directive('back', ['$window', function ($window) {
  return {
    restrict   : 'A',
    replace    : true,
    transclude : true,
    template   : '<span class="back-button" ng-click="back()"><ng-transclude></ng-transclude></span>',
    link       : function(scope, element, attrs) {
      scope.back = function () {
        $window.history.back();
      }
     }
  };
}]);


//
// Style markdown. handle linking. its ugly, but it works
popa.directive('markdown', ['$window', 'Utils', '$sce', '$compile', '$location', function ($window, Utils, $sce, $compile, $location) {
  return {
    restrict   : 'E',
    replace    : false,
    scope      : {
      content : '='
    },
    link       : function(scope, element, attrs) {
      scope.$watch('content', function () {
        if (scope.content) {
          var mdContent = '<div class="markdown-content">' + marked(scope.content) + '</div>';

          element.html(mdContent);

          //add prettyprint
          element.find('pre').addClass('prettyprint');

          // if there is a key, separate it
          //
          var $keyHeader = element.find('#key');
          if ($keyHeader.length) {
            var $keyList  = $keyHeader.next('ul').remove();

            $keyList.find('a code').each(function () {
              var $self = $(this);
              var text  = $self.text();

              text = text.replace(/(.+\.)(.+)\(.*\)/, '$1<span>$2</span>');

              $self.html(text);
              $self.closest('a').addClass('function');
            });

            var keyList   = $keyList.html() || '';
            var keyHeader = $keyHeader.remove().html() || '';
            var key       = '<div class="markdown-key" ng-show="expanded"><ul>' + keyList + '</ul></div>';

            element.prepend(key);
          }

          // add classes to doc cards
          if (attrs.documentation) {
            element.find('h3 code').closest('h3').each(function () {
              var $self = $(this);
              var $content = $self.nextUntil('h1, h2, h3');

              var content = '';
              $content.each(function () {
                var $this = $(this);
                content += $this.outerHtml();
              });

              $self.before('<div class="doc-function">' + $self.outerHtml() + content + '</div>');

              $self.remove();
              $content.remove();
            });
          }

          // sanitize a href's
          element.find('a[href*="#"]').each (function () {
            var $this = $(this);
            var id    = ($this.attr('href') || '').replace(/-/g, '');

            $this.attr('id', id);

            $this.on('click', function (e) {
              e.preventDefault();
              contentScroll(id);
            });
          });

          // sanitize ids for linking
          element.find('h1[id*="-"], h2[id*="-"], h3[id*="-"], h4[id*="-"]').each(function () {
            var $this = $(this);
            var id = ($this.attr('id') || '').replace(/-/g, '');
            $this.attr('id', id);
          });

          element.prepend('<div class="expand-key" ng-click="expandHanlder()"><sprite name="ion-navicon" size="16"></sprite></div>');


          function contentScroll (id) {
            if (!id) { return; }

            id = /^\#/.test(id) ? id : '#' + id

            var $content = element.find('.markdown-content');
            var $target  = $content.find(id);

            if (!($target.length && $content.length)) { return; }

            $location.search('target', id.replace('#', ''));  /// TODO : make this work

            $content.animate({
              scrollTop: $target.offset().top - ($content.offset().top - $content.scrollTop()) - 20
            }, 0);
          }

          scope.scrollTo = Utils.scrollTo;
          $compile(element.contents())(scope);

          prettyPrint();
          if ($location.search().target) {
            contentScroll($location.search().target)
          }

          // key expansion on mobile
          scope.expanded = false;
          scope.expandHanlder = function (){
            if (window.innerWidth < 768) {
              scope.expanded = !scope.expanded;
            }
          }
        }
      });
    }
  };
}]);


////////////////////////////////////////////////////////////////////////
//
//  Boostrap Directives
//
////////////////////////////////////////////////////////////////////////


//
// replace with a container/row combo for bootstrap
popa.directive('row', [function () {
  return {
    restrict   : 'E',
    replace    : true,
    transclude : true,
    template   : '<div class="container-fluid"><div class="row-fluid"><ng-transclude></ng-transclude></div></div>',
  };
}]);


////////////////////////////////////////////////////////////////////////
//
//  Utility Directives
//
////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////
//
//  Form Validation Directives
//
////////////////////////////////////////////////////////////////////////

//
// Custon Validators
//


popa.directive('email', ['Patterns', function (Patterns) {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, ctrl) {
      ctrl.$validators.email = function(modelValue, viewValue) {
        return Patterns.email.test(viewValue);
      };
    }
  };
}]);


popa.directive('password', ['Patterns', function (Patterns) {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, ctrl) {
      ctrl.$validators.password = function(modelValue, viewValue) {
        return Patterns.password.test(viewValue);
      };
    }
  };
}]);



popa.directive('match', [function () {
  return {
    require : 'ngModel',
    link: function (scope, element, attrs, ctrl) {
      var $matchInput = element.closest('form').find('input[ng-model="' + attrs.match + '"]');

      // listen for changes on the mathing element, so we can update ourself
      $matchInput.on('keyup', function () {
        delete ctrl.$error.match;

        if (element.val() != $matchInput.val()) {
          ctrl.$error.match = true;
        }

        element.trigger('keyup');
      })

      ctrl.$validators.match = function(modelValue, viewValue) {
        var matchVal = $matchInput.val();
        return matchVal == viewValue;
      };
    }
  };
}]);

//
// Validation handler
//

// directive to automatically show any errors bound to the accompanying model (`[name].$error` in a form)
//  error display binds to the `name` attribute
popa.directive("validate", [function () {
  // build template errors
  function  getErrorMsg (errors) {
    errors = errors.join('|');
    // NOTE: order is IMPORTANT
    var errorList = [
      {
        error   : 'invalid',
        message : 'is invalid'
      },
      {
        error   : 'match',
        message : 'does not match'
      },
      {
        error   : 'email',
        message : 'must be a valid email'
      },
      {
        error   : 'password',
        message : 'must be at least six characters with one number'
      },
      {
        error   : 'required',
        message : 'is a required field'
      }
    ];

    var errorMsg = 'is invalid';
    _.each(errorList, function (errorObj) {
      if (errors.indexOf(errorObj.error) !== -1) {
        errorMsg = errorObj.message;
      }
    });

    return errorMsg;
  };

  return {
    require : 'ngModel',
    link : function(scope, element, attr, ctrl) {
      element.after('<div class="error" data-matches="' + attr.ngModel + '"></div>');
      var $errorDiv =  element.next('.error[data-matches="' + attr.ngModel + '"]');

      element.on('keyup', handleValidation);
      scope.$watch(attr.ngModel, handleValidation, true);

      function handleValidation () {
        var errorsKeys = Object.keys(ctrl.$error || {});
        if (errorsKeys.length) {
          element.addClass('invalid');
          $errorDiv.text(attr.name.capitalize() + ' ' + getErrorMsg(errorsKeys));
        } else {
          element.removeClass('invalid');
          $errorDiv.empty();
        }
      }
    },
  };
}]);
