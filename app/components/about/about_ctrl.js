
var aboutCtrl = angular.module('popa').controller('AboutCtrl', ['$scope', 'AboutModel', function ($scope, AboutModel) {
  $scope.model = AboutModel;
}]);






// Expect target:
// [{
//   heading: {
//     title   : 'string',
//     subtext : ['strign array']
//   }, content: {
//     description : 'string',
//     synopsis    : ['string array']
//   }
// }]
aboutCtrl.directive('timeline', ['$window', 'Utils', 'Sizes', 'Links', function ($window, Utils, Sizes, Links) {
  return {
    restrict    : 'E',
    scope       : {
      target : '='
    },
    replace     : true,
    templateUrl : Utils.partial('timeline'),
    link        : function (scope, element, attrs) {

      //
      // generate an object of years active
      //
      var years = {
        list     : [],
        totalQts : 0,
        addYear  : function (name, qts) {
          if (name) {
            qts = qts || 4;
            years.totalQts += qts
            years.list.push({
              name     : name,
              quarters : qts
            });
          }
        }
      };

      years.addYear('09', 2);
      years.addYear('10');
      years.addYear('11');
      years.addYear('12');
      years.addYear('13');
      years.addYear('14');
      years.addYear('15', 1);

      var totalQts = years.totalQts;
      function percentQts (qts) {
        return 100 * (qts/ totalQts);
      }

      // calculate the percent each year should take up
      _.each(years.list, function (year, index) {
        years.list[index].percent = percentQts(year.quarters);
      });

      scope.years = years.list;

      // separate targets so the dont overlap
      scope.targetSets = {
        top    : [],
        bottom : []
      }

      //
      // set the last target to be active
      //
      var lastTarget = scope.target.length -1;
      scope.active = scope.target[lastTarget];
      scope.target[lastTarget].active = true;

      //
      // Calcuate year offsets and durations
      //
      _.each(scope.target, function (target, index) {
        var timeframe = target.timeframe;

        target.duration = percentQts(timeframe.end - timeframe.start);

        // abbreviate small timeframes on desktop
        if (Utils.displayType() !== 'mobile') {
          target.useAbbrev = (target.duration < 15);
        }

        if (timeframe.top) {
          var topLen = scope.targetSets.top.length;
          var offsetStart = topLen ? scope.targetSets.top[topLen - 1].timeframe.end : 0;

          target.offset = percentQts(timeframe.start - offsetStart);
          scope.targetSets.top.push(target);

        } else {
          var botLen = scope.targetSets.bottom.length;
          var offsetStart = botLen ? scope.targetSets.bottom[botLen - 1].timeframe.end : 0;

          target.offset = percentQts(timeframe.start - offsetStart);
          scope.targetSets.bottom.push(target);
        }

        scope.target[index] = target;


        //
        // Lstieners
        //


        // Select
        //
        scope.selectTraget = function (target) {
          // set the other possible targes to be inactive
          _.each(scope.target, function (_target) { _target.active = false; });

          //activate the current target
          target.active = true;
          scope.active = target;

          if (Utils.displayType() === 'mobile') {
            Utils.scrollTo('.timeline-container', 1000);
          }
        }

        // Resize
        //
        Utils.onResize(scope, function (newSize, oldSize, transition) {
          if (transition) {

            // never use abbreviation text on mobile
            if  (newSize.displayType === 'mobile') {
              _.each(scope.target, function (target, index) {
                target.useAbbrev = false;
              });

            // check for abbreviations on dektop
            } else if (newSize.displayType === 'desktop') {
              _.each(scope.target, function (target, index) {
                target.useAbbrev = (target.duration < 15);
              });
            }
          }
        });
      });
    }
  };
}]);