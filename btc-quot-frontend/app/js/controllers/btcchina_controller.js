(function(ng){
  ng.module('app').controller('TradeController',function($scope,$interval, TradeService){
    $interval(function(){
      TradeService.queryBtcChina().success(function(data){
        $scope.btcChinaTrade = data;
      });
      TradeService.queryFxBtc().success(function(data){
        $scope.fxBtcTrade = data;
      });
    },5000);
  });
})(angular);