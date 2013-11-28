(function(angular){
  angular.module('app').controller('QuotController',function($scope,$interval,$timeout, QuotService){
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
      $timeout(function(){
        $scope.quotStyle.btcChinaFade = 'fade';
        $timeout(function(){
          $scope.quotStyle.btcChinaFade = 'fade-out';
        },10);
      });
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

      $timeout(function(){
        $scope.quotStyle.fxBtcFade = 'fade';
        $timeout(function(){
          $scope.quotStyle.fxBtcFade = 'fade-out';
        },10);
      });

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
      $timeout(function(){
        $scope.quotStyle.mtgoxFade = 'fade';
        $timeout(function(){
          $scope.quotStyle.mtgoxFade = 'fade-out';
        },10);
      });
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
      $timeout(function(){
        $scope.quotStyle.bitstampFade = 'fade';
        $timeout(function(){
          $scope.quotStyle.bitstampFade = 'fade-out';
        },10);
      });
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
      $timeout(function(){
        $scope.quotStyle.q796Fade = 'fade';
        $timeout(function(){
          $scope.quotStyle.q796Fade = 'fade-out';
        },10);
      });
    });

  });
})(angular);