var contactCtrl = popa.controller('ContactCtrl', ['$scope', 'ContactModel', 'FormHelper', function ($scope, ContactModel, FormHelper) {
  $scope.model = ContactModel;

  var southWest = L.latLng(38.68427,-80.69252);
  var northEast = L.latLng(40.960715,-75.794678);

  // map setup
  L.mapbox.accessToken = ContactModel.leaflet.mapboxToken;
  var map = L.mapbox.map('map', 'johnhof.l3mdca18', {
    center             : ContactModel.coords,
    zoom               : 12,
    maxZoom            : 15,
    minZoom            : 6,
    maxBounds          : L.latLngBounds(southWest, northEast),
    attribution        : '',
    infoControl        : false,
    attributionControl : false,
    zoomControl        :false
  });

  //
  // contact submit handling
  //

  $scope.inputs = {
    name    : null,
    email   : null,
    subject : null,
    message : null
  };


  $scope.submit = function () {
    var form = FormHelper($scope.form,  $scope.inputs);

    form.validate();
  }

}]);