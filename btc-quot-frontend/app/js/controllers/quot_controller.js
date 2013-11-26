(function(angular){
  angular.module('app').controller('QuotController',function($scope,$interval, QuotService){
    $scope.quotStyle = {};
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


    $scope.$watch('btcChinaQuot.ticker.last', function(newValue, oldValue){
      if(!newValue && !oldValue){
        return;
      }
      if(newValue > oldValue){
        $scope.quotStyle.btcChina = 'up';
      }else{
        $scope.quotStyle.btcChina = 'down';
      }
    });

    $scope.$watch('fxBtcQuot.ticker.last_rate', function(newValue, oldValue){
      if(!newValue && !oldValue){
        return;
      }
      if(newValue > oldValue){
        $scope.quotStyle.fxBtc = 'up';
      }else{
        $scope.quotStyle.fxBtc = 'down';
      }
    });

    $scope.$watch('mtgoxQuot.data.last.value', function(newValue, oldValue){
      if(!newValue && !oldValue){
        return;
      }
      if(newValue > oldValue){
        $scope.quotStyle.mtgox = 'up';
      }else{
        $scope.quotStyle.mtgox = 'down';
      }
    });

    $scope.$watch('bitstampQuot.last', function(newValue, oldValue){
      if(!newValue && !oldValue){
        return;
      }
      if(newValue > oldValue){
        $scope.quotStyle.bitstamp = 'up';
      }else{
        $scope.quotStyle.bitstamp = 'down';
      }
    });

    $scope.$watch('q796Quot.return.last', function(newValue, oldValue){
      if(!newValue && !oldValue){
        return;
      }
      if(newValue > oldValue){
        $scope.quotStyle.q796 = 'up';
      }else{
        $scope.quotStyle.q796 = 'down';
      }
    });

  });
})(angular);