//
// App setup
//


'use strict';


var popa = angular.module('popa', [

  // utility modules
  'ngRoute',
  'ngResource'
]);


popa.run(['$rootScope', '$http', function ($rootScope, $http) {
  // Preload large images on app load
  _.each([
      'hero-me.jpg'
    ], function (image) {
      $http.get('../images/' + image);
    });
}]);


//
// constants
//


popa.constant('Patterns', {
  email    : /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  password : /^.*(?=.{4,10})(?=.*\d)(?=.*[a-zA-Z]).*$/
});

popa.constant('SpriteMap', {
  angular : {
    href : 'https://angularjs.org/',
    name : 'ion-social-angular'
  },
  bootstrap : {
    href : 'http://getbootstrap.com/',
    name : 'bootstrap'
  },
  chrome : {
    href : 'https://developer.chrome.com/extensions/getstarted',
    name : 'ion-social-chrome'
  },
  css : {
    href : 'http://www.css3.info/',
    name : 'ion-social-css3'
  },
  document : {
    href : null,
    name : 'ion-android-document'
  },
  facebook : {
    href : 'https://www.facebook.com/john.hofrichter',
    name : 'ion-social-facebook'
  },
  github : {
    href : 'https://github.com/johnhof',
    name : 'ion-social-github'
  },
  html : {
    href : 'http://www.html5rocks.com/en/',
    name : 'ion-social-html5'
  },
  javascript : {
    href : 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    name : 'ion-social-javascript'
  },
  linkedin : {
    href : 'https://www.linkedin.com/in/johnhofrichter/',
    name : 'ion-social-linkedin'
  },
  linux : {
    href : 'http://www.linux.com/',
    name : 'ion-social-tux'
  },
  mongo : {
    href : 'http://www.mongodb.org/',
    name : 'Mongodb'
  },
  node : {
    href : 'http://nodejs.org/',
    name : 'ion-social-nodejs'
  },
  sass : {
    href : 'http://sass-lang.com/',
    name : 'ion-social-sass'
  },
})


popa.constant('Sizes', {
  headerHeight : 70,
  mobileBreak  : 768
});