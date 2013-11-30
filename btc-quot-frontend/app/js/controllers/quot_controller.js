(function(angular){
  angular.module('app').controller('QuotController',function($scope,$interval,$timeout, QuotService){

    var marketStyle = {};

    $scope.fadeClass = function(market){
      if(!marketStyle[market]){
        marketStyle[market] = {};
      }
      return marketStyle[market].fadeClass;
    };

    $scope.updownClass = function(market){
      if(!marketStyle[market]){
        marketStyle[market] = {};
      }
      return marketStyle[market].updownClass;
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

    $scope.subtract = function(v1, v2){
      if(!v1 || !v2 || v1 - v2 === 0){
        return 'N/A';
      }
      return (v1 - v2).toFixed(2);
    };
    $scope.subtractClass = function(value){
      if(!value || value === 'N/A'){
        return '';
      }
      return value > 0 ? 'up' : 'down';
    };

    $interval(function(){
      QuotService.query().success(function(data){
        $scope.quot = data;
        var quotList = [];
        for(var key in data){
          quotList.push(data[key]);
        }
        $scope.quotList = quotList;
      });
    },2000);

  });
})(angular);