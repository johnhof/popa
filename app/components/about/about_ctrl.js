
var aboutCtrl = angular.module('popa').controller('AboutCtrl', ['$scope',  'Utils', function ($scope, Utils) {
  $scope.scrollTo = Utils.scrollTo;
  $scope.setHash  = Utils.setHash;

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


  $scope.experiences = [
    // Pitt
    {
      title       : ['University of Pittsburgh', 'fall 2009 - Winter 2013', 'BS Computer Science'],
      description : 'The early years were primarily java for basic instruction and data structres/algorithms. My targeted classes were in Operating Systems (wrote a file system), Networks (implemented TCP), Algorithm design (primarily proofs and dynamic algorithms), Cryptography & Security (designed and developed a secure server), UI design (wrote several Android apps), Web programming (wrote a handful of web apps).',
      synopsis    : ['Javascript', 'Java ', 'C', 'C++', 'PHP', 'Assembly']

    // Ansys
    }, {
      title       : ['Ansys Inc.', 'spring 2011 - fall 2012','Co-Op, 3 semesters ~ 1 year'],
      description : 'Worked on the DesignModeler parametric geometry software as a part of the Ansys Workbench. The first semester was primarily spent bug fixing in high level code. The second semester was spend on several larger projects, the most signicant being a Shaft geometry generation tool.  The final semester had a few more small projects, but most time was spent analyzing load times and implementing multi threading of the file load process.',
      synopsis    : ['C++', 'Javascript', 'C#', 'Visual Studios']

    // DoD
    }, {
      title       : ['Department of Defense', 'Summer 2013', 'Intern'],
      description : null,
      synopsis    : ['Javascript', 'Batch', ' Python']

    // BB
    }, {
      title       : ['Branding Brand Inc.', 'fall 2013 - ?', 'Full Stack Developer'],
      description : 'Started as an API developer scraping commerce sites for a generic BB API. After a few months, I moved to the post launch development team as a full stack develper. I\m currently splitting my time down the middle between API and Front End development',
      synopsis    : ['Javascript', 'JQuery', 'PHP', 'HTML/CSS', 'Node/Express']
    }
  ];





  $scope.experiences = [{
    heading: {
      abbrev  : 'Pitt',
      title   : 'University of Pittsburgh',
      subtext : ['Fall 2009 - Winter 2013', 'BS Computer Science']
    }, content : {
      description : 'The early years were primarily java for basic instruction and data structres/algorithms. My targeted classes were in Operating Systems (wrote a file system), Networks (implemented TCP), Algorithm design (primarily proofs and dynamic algorithms), Cryptography & Security (designed and developed a secure server), UI design (wrote several Android apps), Web programming (wrote a handful of web apps).',
      synopsis    : ['Javascript', 'Java ', 'C', 'C++', 'PHP', 'Assembly']
    },
    timeframe : {
      start : 0,
      end   : 18,
      top   : true,
    }
  }, {
    heading: {
      abbrev   : 'Ansys',
      title   : 'Ansys Inc',
      subtext : ['Spring 2011 - fall 2012', 'Co-Op, 3 semesters ~ 1 year']
    }, content : {
      description : 'Worked on the DesignModeler parametric geometry software as a part of the Ansys Workbench. The first semester was primarily spent bug fixing in high level code. The second semester was spend on several larger projects, the most signicant being a Shaft geometry generation tool.  The final semester had a few more small projects, but most time was spent analyzing load times and implementing multi threading of the file load process.',
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
      description : null,
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
      subtext : ['Fall 2013 - ?', 'Full Stack Developer']
    }, content : {
      description : 'Started as an API developer scraping commerce sites for a generic BB API. After a few months, I moved to the post launch development team as a full stack develper. I\m currently splitting my time down the middle between API and Front End development.',
      synopsis    : ['Javascript', 'JQuery', 'PHP', 'HTML/CSS', 'Node/Express']
    },
    timeframe : {
      start : 16.5,
      end   : 23
    }
  }];


  $scope.scrollTo = Utils.scrollTo('hash');
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
aboutCtrl.directive('timeline', [function () {
  return {
    restrict    : 'E',
    scope       : true,
    replace     : true,
    templateUrl : '../views/_timeline.html',
    link        : function (scope, element, attrs) {
      scope.target = scope[attrs.target];

      // generate an object of years active
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

      // calculate the year duration and start offest for each experience

      scope.targetSets = {
        top    : [],
        bottom : []
      }

      _.each(scope.target, function (target, index) {
        var timeframe = target.timeframe;

        target.duration = percentQts(timeframe.end - timeframe.start);

        target.useAbbrev = ((timeframe.end - timeframe.start) < 2);

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
        // select
        //

        scope.selectTraget = function (target) {
          // set the other possible targes to be inactive
          _.each(scope.target, function (_target) { _target.active = false; });

          //activate the current target
          target.active = true;
          scope.active = target;
        }
      });
    }
  };
}]);