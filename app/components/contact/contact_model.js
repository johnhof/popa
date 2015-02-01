angular.module('popa').service('ContactModel', ['Links', function (Links) {
  // var lat = 40.45916;
  // var lon = -79.916868;

  var lat = 40.444353;
  var lon = -79.960835;

  return {
    links : [
      {
        label   : 'Email',
        href    : Links.email.href,
        display : Links.email.path,
        target  : ''
      }, {
        label   : 'Linkedin',
        href    : Links.linkedin.href,
        display : Links.linkedin.path,
        target  : '_blank'
      }, {
        label   : 'Facebook',
        href    : Links.facebook.href,
        display : Links.facebook.path,
        target  : '_blank'
      }, {
        label   : 'Github',
        href    : Links.github.href,
        display : Links.github.path,
        target  : '_blank'
      }
    ],

    lat    : lat,
    lon    : lon,
    coords : [lat, lon],

    leaflet : {
      mapboxToken : 'pk.eyJ1Ijoiam9obmhvZiIsImEiOiJGR0l3RTZBIn0.csQdPBJWs31ShLfSxe_nMQ',
    }

  }
}]);