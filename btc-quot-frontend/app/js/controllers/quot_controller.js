(function(ng){
  ng.module('app').controller('QuotController',function($scope,$interval, QuotService){
    $interval(function(){
      QuotService.query().success(function(data){
        if(data.btcChina){
          $scope.btcChinaQuot = data.btcChina;
        }
        if(data.fxBtc){
          $scope.fxBtcQuot = data.fxBtc;
        }
      });
    },2000);
  });
})(angular);