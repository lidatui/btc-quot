
/*
 * GET home page.
 */

var http = require('http');
var quot = {};

exports.query = function(req, res){
  res.json(quot);
};

setInterval(function(){

  http.get("http://data.btcchina.com/data/ticker", function(result) {
    var responseParts = [];
    result.setEncoding('utf8');
    result.on("data", function(chunk) {
      responseParts.push(chunk);
    });
    result.on("end", function(){
      try{
        console.log('btcChina -> ' + responseParts.join(''));
        quot.btcChina = JSON.parse(responseParts.join(''));
      }catch(e){
        console.error(e);
      }

    });
  });

  http.get("http://data.fxbtc.com/api?op=query_ticker&symbol=btc_cny", function(result) {
    var responseParts = [];
    result.setEncoding('utf8');
    result.on("data", function(chunk) {
      responseParts.push(chunk);
    });
    result.on("end", function(){
      try{
        console.log('fxBtc -> ' + responseParts.join(''));
        quot.fxBtc = JSON.parse(responseParts.join(''));
      }catch(e){
        console.error(e);
      }
    });
  });

},5000);

