
// add a sprite from the sprite sheet
//
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


// partial width divider
//
popa.directive('divider', [function () {
  return {
    restrict : 'E',
    replace  : true,
    template : '<div class="divider"><span></span></div>',
  };
}]);

// small diamond div
//
popa.directive('diamond', [function () {
  return {
    restrict : 'E',
    replace  : true,
    template : '<div class="diamond"><span>◆</span></div>',
  };
}]);


// transclude inside vertical centered table cell
//
popa.directive('center', [function () {
  return {
    restrict   : 'EA',
    replace    : true,
    transclude : true,
    template   : '<div class="vertical-center-outer"><div class="vertical-center-inner"><ng-transclude></ng-transclude></div></div>',
  };
}]);


// set the height to match the port
//
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


// add a sprite from the sprite sheet
//
popa.directive('back-button', ['$window', function ($window) {
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