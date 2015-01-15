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
popa.directive('sprite', [function (Patterns) {
  return {
    restrict : 'E',
    replace  : true,
    scope    : {
      href : '@',
      name : '@'
    },
    template : '<a class="sprite {{name}} size-{{size}}" href="{{href}}"></a>',
    link     : function (scope, element, attrs) {
      scope.href = attrs.href;
      scope.name = attrs.name;
      scope.size = attrs.size || '32';
    }
  };
}]);

//
// partial width divider
popa.directive('divider', [function (Patterns) {
  return {
    restrict : 'E',
    replace  : true,
    template : '<div class="divider"><span></span></div>',
  };
}]);

//
// small diamond div
popa.directive('diamond', [function (Patterns) {
  return {
    restrict : 'E',
    replace  : true,
    template : '<div class="diamond"><span>◆</span></div>',
  };
}]);

//
// transclude inside vertical centered table cell
popa.directive('center', [function (Patterns) {
  return {
    restrict   : 'E',
    replace    : true,
    transclude : true,
    template   : '<div class="vertical-center-outer"><div class="vertical-center-inner"><ng-transclude></ng-transclude></div></div>',
  };
}]);

//
// replace with a container/row combo for bootstrap
popa.directive('row', [function (Patterns) {
  return {
    restrict   : 'E',
    replace    : true,
    transclude : true,
    template   : '<div class="container-fluid"><div class="row"><ng-transclude></ng-transclude></div></div>',
  };
}]);

//
// set the height to match the port
popa.directive('full-port-height', ['$window', function ($window) {
console.log('test')
  return function (scope, element, attr) {
    //
    // TODO: fix me
    //

console.log('test2')

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


////////////////////////////////////////////////////////////////////////
//
//  Utility Directives
//
////////////////////////////////////////////////////////////////////////


//
// Cards
//

popa.directive('card-row', [function (Patterns) {
  return {
    scope    : {
      label : '=',
      value : '='
    },
    template : '<span class="label">label</span>  <span class="value">value</span>'
  };
}]);

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
