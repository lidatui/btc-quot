
/*
 * btcChina.
 */
var http = require('http');

exports.query = function(req, res){
  http.get("http://data.fxbtc.com/api?op=query_ticker&symbol=btc_cny", function(rp) {
    rp.pipe(res);
  });
};
