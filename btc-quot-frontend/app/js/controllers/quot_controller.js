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
        if(data.mtgox){
          $scope.mtgoxQuot = data.mtgox;
        }
        if(data.bitstamp){
          $scope.bitstampQuot = data.bitstamp;
        }
        if(data.q796){
          $scope.q796Quot = data.q796;
        }
      });
    },2000);
  });
})(angular);