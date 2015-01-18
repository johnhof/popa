
var aboutCtrl = angular.module('popa').controller('AboutCtrl', ['$scope',  'Utils', function ($scope, Utils) {

  //
  // Fun facts
  //

  $scope.likes = [
    'Rock Climbing',
    'Woodworking',
    'Cycling',
    'Hiking',
    'Camping',
    'Playing hockey and soccer',
    'Watching the Pittsburgh Penguins win',
    'Good Whiskey',
    'Good Beer',
  ];

  $scope.dislikes = [
    'Cold weather',
    'Watching the Penguins lose',
    'Finding the office coffee pot empty',
    'Distance Running',
    'Swimming',
  ];

  //
  // Experiences
  //

  $scope.experiences = [{
    heading: {
      abbrev  : 'Pitt',
      title   : 'University of Pittsburgh',
      subtext : ['Fall 2009 - Winter 2013', 'BS Computer Science']
    }, content : {
      description : 'The early years were primarily java for basic instruction and data structres/algorithms. My targeted classes were in Operating Systems (wrote a file system), Networks (implemented TCP), Algorithm design (primarily proofs and dynamic algorithms), Cryptography & Security (designed and developed a secure server), UI design (wrote several Android apps), Web programming (wrote a handful of web apps).',
      synopsis    : ['Java ', 'C', 'C++', 'PHP', 'Javascript', 'Assembly']
    },
    timeframe : {
      start : 0,
      end   : 18,
      top   : true,
    }
  }, {
    heading: {
      abbrev   : 'Ansys',
      title   : 'Ansys Inc.',
      subtext : ['Spring 2011 - fall 2012', 'Co-Op, 3 semesters ~ 1 year']
    }, content : {
      description : 'Worked on the DesignModeler parametric geometry software as a part of the Ansys Workbench. The first semester was primarily spent bug fixing in high level code. The second semester was spent on several larger projects, the most signicant being a Shaft geometry generation tool.  The final semester had a few more small projects, but most time was spent analyzing load times and implementing multi threading of the file load process.',
      synopsis    : ['C++', 'Javascript', 'C#', 'Visual Studios']
    },
    timeframe : {
      start : 8,
      end   : 14
    }
  }, {
    heading: {
      abbrev  : 'DoD',
      title   : 'Department of Defense',
      subtext : ['Summer 2013', 'Intern']
    }, content : {
      description : 'Talk to me in person for more information',
      synopsis    : ['Javascript', 'Batch', ' Python']
    },
    timeframe : {
      start : 15,
      end   : 16.5
    }
  }, {
    heading: {
      abbrev  : 'BB',
      title   : 'Branding Brand Inc.',
      subtext : ['Fall 2013 - Current', 'Full Stack Developer']
    }, content : {
      description : 'Started as an API developer scraping commerce sites for a generic BB API. After a few months, I moved to the post launch development team as a full stack develper. I\m currently splitting my time down the middle between API and Front End development.',
      synopsis    : ['Javascript', 'Node/Express', 'PHP', 'CSS3', 'SCSS', 'LESS']
    },
    timeframe : {
      start : 16.5,
      end   : 23
    }
  }];


  //
  // Projects
  //


  $scope.projects = [{
    name        : 'IceBuddy',
    utilities   : Utils.spriteSet(['javascript', 'node', 'angular', 'mongodb', 'express', 'grunt', 'css', 'html']),
    description : 'A statistic tracking web application designed for casual hockey players. Modularized to be expanded to other sports',
    link        : {
      href   : 'https://github.com/johnhof/IceBuddy',
      sprite : Utils.sprite('github').name
    }
  }, {
    name        : 'Mongoman',
    utilities   : Utils.spriteSet(['javascript', 'node', 'mongodb', 'npm']),
    description : 'A Node module designed to simplify mongo schema/validation construction and provide a few utilities for use in handlers',
    link        : {
      href   : '/mongoman',
      sprite : Utils.sprite('document').name
    }
  }, {
    name        : 'ApiTester',
    utilities   : Utils.spriteSet(['javascript', 'node']),
    description : 'An API test framework designed to test against a commerce API, The focus here is to make it easily extensible for use in differing projects',
    link        : {
      href   : 'https://github.com/johnhof/ApiTester',
      sprite : Utils.sprite('github').name
    }
  }, {
    name        : 'JiraJockey',
    utilities   : Utils.spriteSet(['javascript', 'chrome', 'css', 'html']),
    description : 'A Chrome plugin to bridge the gap between the Jira ticketing system and GitHub, as well as fill in various gaps in the functionality of both',
    link        : {
      href   : 'https://github.com/johnhof/JiraJockey',
      sprite : Utils.sprite('github').name
    }
  }]
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
aboutCtrl.directive('timeline', ['$window', 'Utils', 'Sizes', function ($window, Utils, Sizes) {
  return {
    restrict    : 'E',
    scope       : true,
    replace     : true,
    templateUrl : Utils.partial('timeline'),
    link        : function (scope, element, attrs) {
      scope.target = scope[attrs.target];

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




// Expect project:
// [{
//   name        : 'string',
//   utilities   : ['string'],
//   description : 'string',
//   link        : 'string'
// }]
aboutCtrl.directive('project', ['$window', 'Utils', 'Sizes', function ($window, Utils, Sizes) {
  return {
    restrict    : 'E',
    scope       : true,
    replace     : true,
    templateUrl : Utils.partial('project'),
    link        : function (scope, element, attrs) {
      scope.open = function (url) {
        if (/^\//.test(url)) {
          Utils.redirect(url);
        } else {
          Utils.newTab(url);
        }
      }
    }
  };
}]);