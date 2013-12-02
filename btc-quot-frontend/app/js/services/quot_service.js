
(function(angular){
  angular.module('app').factory('QuotService', function($http){
    var find = function() {
      return $http.get('/quot');
    };
    return {
      find: find
    };
  });
})(angular);