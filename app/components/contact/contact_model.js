angular.module('popa').service('ContactModel', ['Links', 'SpriteMap', function (Links, SpriteMap) {
  var lat = 40.444353;
  var lon = -79.960835;

  return {
    links : [
      {
        sprite  : SpriteMap.email.name,
        href    : Links.email.href,
        display : Links.email.path,
        target  : ''
      }, {
        sprite  : SpriteMap.linkedin.name,
        href    : Links.linkedin.href,
        display : Links.linkedin.path,
        target  : '_blank'
      }, {
        sprite  : SpriteMap.facebook.name,
        href    : Links.facebook.href,
        display : Links.facebook.path,
        target  : '_blank'
      }, {
        sprite  : SpriteMap.github.name,
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