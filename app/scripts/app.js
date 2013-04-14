'use strict';

<<<<<<< HEAD
angular.module('hitchARideApp', ['btford.socket-io'])
  .config(function ($routeProvider, $locationProvider) {
	  
	  
    $routeProvider
      .when('/', {
        templateUrl: 'views/new-trip.html'
      })
      .when('/ride', {
        templateUrl: 'views/ride.html',
        controller: 'RideCtrl'
      })
      .when('/drive', {
        templateUrl: 'views/drive.html',
        controller: 'DriveCtrl'
      })
      .when('/trips', {
        templateUrl: 'views/trips.html',
        controller: 'TripsCtrl'
      })
      .when('/trip/:type/from/:from/to/:to', {
        templateUrl: 'views/trip.html',
        controller: 'TripCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
=======
angular.module('hitchARideApp', [
  'btford.socket-io',
  'btford.phonegap.geolocation',
  'btford.mock-phonegap-ready'
])
.config(function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/new-trip.html'
    })
    .when('/ride', {
      templateUrl: 'views/ride.html',
      controller: 'RideCtrl'
    })
    .when('/drive', {
      templateUrl: 'views/drive.html',
      controller: 'DriveCtrl'
    })
    .when('/trips/:id', {
      templateUrl: 'views/trip.html',
      controller: 'TripCtrl'
    })
    .when('/trips', {
      templateUrl: 'views/trips.html',
      controller: 'TripsCtrl'
    })
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'LoginCtrl'
    })
    .when('/profile', {
      templateUrl: 'views/profile.html',
      controller: 'ProfileCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
>>>>>>> 69632fc2618327c691428d7a89c4f564639b9144

  $locationProvider.html5Mode(true);
})
.run(function (socket, login) {
  socket.broadcast('trip:matched');
});
