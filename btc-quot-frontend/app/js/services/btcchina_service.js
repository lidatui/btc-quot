
(function(ng){
  ng.module('app').factory('TradeService', function($http){
    var queryBtcChina = function() {
      return $http.get('/btcChina');
    };
    var queryFxBtc = function() {
      return $http.get('/fxBtc');
    };
    return {
      queryBtcChina: queryBtcChina,
      queryFxBtc : queryFxBtc
    };
  });
})(angular);