(function(angular){
  angular.module('app').directive('subtractCnyLastValue', function(){
    return function(scope, element, attributes){
      var qtLast = scope.qt && scope.qt.CNY ? scope.qt.CNY.last : 0;
      var qLast = scope.q && scope.q.CNY ? scope.q.CNY.last : 0;

      if(!qtLast || !qLast || qtLast - qLast === 0){
        element.text('N/A');

      }else{
        element.text((qtLast - qLast).toFixed(2));
        element.removeClass().addClass((qtLast - qLast) > 0 ? 'up' : 'down');
      }

    };
  });

})(angular);