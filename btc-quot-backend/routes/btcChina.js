
/*
 * btcChina.
 */
var http = require('http');

exports.query = function(req, res){

  http.get("http://data.btcchina.com/data/ticker", function(rp) {
    rp.pipe(res);
  });
};
