angular.module("app").config(function($routeProvider, $locationProvider) {

  $locationProvider.html5Mode(true);

  $routeProvider.when('/', {
    templateUrl: 'quot.html',
    controller: 'QuotController'
  });


  $routeProvider.otherwise({ redirectTo: '/' });

});