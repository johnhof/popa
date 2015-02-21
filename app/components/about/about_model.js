angular.module('popa').service('AboutModel', ['Utils', function (Utils) {
  return {
    //
    // Fun facts
    //

    likes : [
      'Rock Climbing',
      'Woodworking',
      'Cycling',
      'Hiking',
      'Camping',
      'Playing hockey and soccer',
      'Watching the Pittsburgh Penguins win',
      'Good Whiskey',
      'Good Beer',
    ],

    dislikes : [
      'Cold weather',
      'Watching the Penguins lose',
      'Finding the office coffee pot empty',
      'Poor documentation',
      'Distance running',
      'Swimming',
    ],

    //
    // Experiences
    //

    experiences : [{
      heading: {
        abbrev  : 'Pitt',
        title   : 'University of Pittsburgh',
        subtext : ['Fall 2009 - Winter 2013', 'BS Computer Science']
      }, content : {
        description : 'The early years were primarily Java for basic instruction and data structres/algorithms. My focused classes were in Operating Systems (wrote a file system), Networks (implemented TCP), Algorithm design (primarily proofs and dynamic algorithms), Cryptography & Security (designed and developed a secure server), UI design (wrote several Android apps), and Web programming (wrote a handful of web apps).',
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
        description : 'Worked on the DesignModeler parametric geometry software as a part of the Ansys Workbench. The first semester was primarily spent bug fixing in high level code. The second semester was spent on several larger projects, the most signicant being a Shaft geometry generation tool.  The final semester had a few more small projects, but most of my time was spent analyzing load times and implementing multi threading of the file load process.',
        synopsis    : ['C++', 'Javascript', 'C#', 'Visual Studios']
      },
      timeframe : {
        start : 8,
        end   : 12
      }
    }, {
      heading: {
        abbrev  : 'DoD',
        title   : 'Department of Defense',
        subtext : ['Summer 2013', 'Intern']
      }, content : {
        description : 'Talk to me in person for more information.',
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
        description : 'Started as an API developer scraping commerce sites for a generic BB API. After a few months, I moved to the post launch development team as a full stack develper. I\'m currently splitting my time down the middle between API and Front End development.',
        synopsis    : ['Javascript', 'Node/Express', 'PHP', 'CSS3', 'SCSS', 'LESS']
      },
      timeframe : {
        start : 16.5,
        end   : 23
      }
    }],


    //
    // Projects
    //


    projects : [{
      name        : 'IceBuddy',
      utilities   : Utils.spriteSet(['javascript', 'node', 'angular', 'mongodb', 'express', 'grunt', 'css', 'html']),
      description : 'A statistic tracking web application designed for casual hockey players. Modularized to be expanded to other sports',
      link        : {
        href   : 'repo/IceBuddy',
        sprite : Utils.sprite('github').name
      }
    }, {
      name        : 'Mongoman',
      utilities   : Utils.spriteSet(['javascript', 'node', 'mongodb', 'npm']),
      description : 'A Node module designed to simplify mongo schema/validation construction and provide a few utilities for use in handlers',
      link        : {
        href   : 'mongoman',
        sprite : Utils.sprite('document').name
      }
    }, {
      name        : 'ApiTester',
      utilities   : Utils.spriteSet(['javascript', 'node']),
      description : 'An API test framework designed to test against a commerce API, The focus here is to make it easily extensible for use in differing projects',
      link        : {
        href   : 'repo/ApiTester',
        sprite : Utils.sprite('github').name
      }
    }, {
      name        : 'JiraJockey',
      utilities   : Utils.spriteSet(['javascript', 'chrome', 'css', 'html']),
      description : 'A Chrome plugin to bridge the gap between the Jira ticketing system and GitHub, as well as fill in various gaps in the functionality of both',
      link        : {
        href   : 'repo/JiraJockey',
        sprite : Utils.sprite('github').name
      }
    }]
  };
}]);