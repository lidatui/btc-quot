(function(angular){
  angular.module('app').controller('QuotController',function($scope,$interval,$timeout, QuotService){

    var marketStyle = {};

    $scope.fadeClass = function(market){
      return marketStyle[market].fadeClass;
    };


    var valueListener = function(market){
      return function(newValue, oldValue){
        if(!newValue && !oldValue){
          return;
        }
        if(!marketStyle[market]){
          marketStyle[market] = {};
        }
        if(newValue > oldValue){
          marketStyle[market].updownClass = 'up';
        }else{
          marketStyle[market].updownClass = 'down';
        }
        $timeout(function(){
          marketStyle[market].fadeClass = 'fade';
          $timeout(function(){
            marketStyle[market].fadeClass = 'fade-out';
          },10);
        });
      };
    };
    $scope.$watch('quot.btcchina.CNY.last', valueListener('btcchina'));
    $scope.$watch('quot.fxbtc.CNY.last', valueListener('fxbtc'));
    $scope.$watch('quot.okcoin.CNY.last', valueListener('okcoin'));
    $scope.$watch('quot.mtgox.USD.last', valueListener('mtgox'));
    $scope.$watch('quot.bitstamp.USD.last', valueListener('bitstamp'));
    $scope.$watch('quot.q796.USD.last', valueListener('q796'));



    $interval(function(){
      QuotService.query().success(function(data){
        $scope.quot = data;
      });
    },2000);

  });
})(angular);