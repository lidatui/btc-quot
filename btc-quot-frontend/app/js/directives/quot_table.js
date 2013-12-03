(function (angular) {
  angular.module('app')
    .directive('quotTable', function ($timeout) {
      return {
        restrict: 'A',
        replace: true,
        scope:{
          quotList: '=list'
        },
        templateUrl: 'directives/quot_table.html',
        link: function (scope, element, attributes) {
          var marketStyle = {};

          scope.fadeClass = function (market) {
            if (!marketStyle[market]) {
              marketStyle[market] = {};
            }
            return marketStyle[market].fadeClass;
          };

          scope.updownClass = function (market) {
            if (!marketStyle[market]) {
              marketStyle[market] = {};
            }
            return marketStyle[market].updownClass;
          };

          var valueListener = function (market) {
            return function (newValue, oldValue) {
              if (!newValue && !oldValue) {
                return;
              }

              if (!marketStyle[market]) {
                marketStyle[market] = {};
              }
              if (newValue > oldValue) {
                marketStyle[market].updownClass = 'up';
              } else {
                marketStyle[market].updownClass = 'down';
              }
              $timeout(function () {
                marketStyle[market].fadeClass = 'fade';
                $timeout(function () {
                  marketStyle[market].fadeClass = 'fade-out';
                }, 10);
              });
            };
          };

          var watched;
          scope.$watchCollection('quotList', function (newValue, oldValue) {
            if (!newValue) {
              return;
            }
            for (var i = 0; i < newValue.length; i++) {
              scope[newValue[i].market] = newValue[i];
              if (!watched) {
                scope.$watch(newValue[i].market + '.CNY.last', valueListener(newValue[i].market));
                scope.$watch(newValue[i].market + '.USD.last', valueListener(newValue[i].market));
              }
            }
            watched = true;
          });

        }
      };
    })
    .directive('quotTableSort', function () {
      return {
        require:'^?quotTable',
        link: function (scope, element, attributes) {
          var sorter = angular.element("<span></span>");
          element.append(sorter);
          var column = attributes.quotTableSort;
          scope.$watch('sortColumn',function(newValue,oldValue){
            if(column !== newValue){
              sorter.removeClass('icon-up-dir').removeClass('icon-down-dir');
            }
          });
          element.on('click', function () {
            if (scope.sortColumn !== column || scope.sortColumn === '') {
              scope.sortColumn = column;
              scope.sortExpr = column;
              sorter.removeClass('icon-down-dir').addClass('icon-up-dir');
            }else if (scope.sortExpr.indexOf('-') !== -1) {
              scope.sortColumn = '';
              scope.sortExpr = '';
              sorter.removeClass('icon-up-dir').removeClass('icon-down-dir');
            }else if (scope.sortColumn === column) {
              scope.sortExpr = '-' + column;
              sorter.removeClass('icon-up-dir').addClass('icon-down-dir');
            }
            scope.$apply();
          });
        }
      };
    });

})(angular);