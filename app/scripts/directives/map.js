/*global google:false*/

'use strict';


angular.module('hitchARideApp')
  .directive('searchMap', function () {
    return {
      restrict: 'A',
      link: function (scope, elt, attrs) {//????
        var input = elt[0];
		
        var searchBox = new google.maps.places.SearchBox(input);
        google.maps.event.addListener(searchBox, 'places_changed', function() {
			//$apply() is used to execute an expression in angular from outside of the angular framework.
          scope.$apply(function () {
            var model = scope;
            var modelPath = attrs.ngModel.split('.');
			//alert(modelPath);
            var lastPath = modelPath.pop();
			
            modelPath.forEach(function (path) {
              model = model[path];
            });
            model[lastPath] = elt.val();
			
          });
        });
      }
    };
  })
  .directive('directionsMap', function () {
    return {
      restrict: 'E',
      scope: {
        tripStart: '=',
        tripEnd: '=',
        tripWaypoints: '='
      },
      link: function (scope, elt) {
        var directionsService = new google.maps.DirectionsService();

        var chicago = new google.maps.LatLng(41.850033, -87.6500523);
        var mapOptions = {
          zoom:7,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          center: chicago
        };

        var map = new google.maps.Map(elt[0], mapOptions);

        var directionsDisplay = new google.maps.DirectionsRenderer();
        directionsDisplay.setMap(map);

        var tripStart, tripEnd, tripWaypoints;

        var requestDirections = function () {

          if (tripStart && tripEnd) {
            var dirReq = {
              origin: tripStart,
              destination: tripEnd,
              travelMode: google.maps.DirectionsTravelMode.DRIVING
            };
            if (tripWaypoints) {
              dirReq.waypoints = tripWaypoints;
            }
            directionsService.route(dirReq, function (response, status) {
              if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
              }
            });
          }
        };
//Registers a listener callback to be executed whenever the watchExpression changes.
        scope.$watch('tripWaypoints', function (newVal) {
          tripWaypoints = newVal;
          requestDirections();
        });

        scope.$watch('tripStart', function (newVal) {

          tripStart = newVal;
          requestDirections();
        });

        scope.$watch('tripEnd', function (newVal) {
          tripEnd = newVal;
          requestDirections();
        });

      }
    };
  });
