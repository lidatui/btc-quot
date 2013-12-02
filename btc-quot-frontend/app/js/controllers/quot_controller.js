(function(angular){
  angular.module('app').controller('QuotController',function($scope,$interval, QuotService){

    var cancelRefresh = $interval(function(){
      QuotService.find().success(function(data){
        $scope.quotList = data;
      });
    },2500);

    $scope.$on('$destroy', function(e) {
      $interval.cancel(cancelRefresh);
    });
  });
})(angular);