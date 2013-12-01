angular.module("app").config(function($routeProvider, $locationProvider) {

  $routeProvider.when('/', {
    templateUrl: 'quot.html',
    controller: 'QuotController'
  });

  $routeProvider.when('/login', {
    templateUrl: 'login.html',
    controller: 'LoginController'
  });


  $routeProvider.otherwise({ redirectTo: '/' });

});