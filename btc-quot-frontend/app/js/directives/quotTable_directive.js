(function(angular){
  angular.module('app').directive('quotTable', function($timeout){
    return {
      restrict: 'A',
      replace:true,
      templateUrl: 'directives/quotTable.html',
      controller: function($scope){

        $scope.sortExpr = '';
        $scope.sortColumn = '';
        $scope.sort = function(column){

          if($scope.sortColumn !== column || $scope.sortColumn === ''){
            $scope.sortColumn = column;
            $scope.sortExpr = column;
            return;
          }

          if($scope.sortExpr.indexOf('-') !== -1){
            $scope.sortColumn = '';
            $scope.sortExpr = '';
            return;
          }

          if($scope.sortColumn === column){
            $scope.sortExpr = '-'+column;
            return;
          }
        };

      },
      link: function(scope, element, attributes){
        var marketStyle = {};

        scope.fadeClass = function(market){
          if(!marketStyle[market]){
            marketStyle[market] = {};
          }
          return marketStyle[market].fadeClass;
        };

        scope.updownClass = function(market){
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

        var watched;
        scope.$watchCollection('quotList', function(newValue,oldValue){
          if(!newValue){
            return;
          }
          for(var i=0; i<newValue.length; i++){
            scope[newValue[i].market] = newValue[i];
            if(!watched){
              scope.$watch(newValue[i].market+'.CNY.last', valueListener(newValue[i].market));
              scope.$watch(newValue[i].market+'.USD.last', valueListener(newValue[i].market));
            }
          }
          watched = true;
        });

      }
    };


  });

})(angular);