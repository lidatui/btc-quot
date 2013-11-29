/*
 * GET home page.
 */

var http = require('http');
var https = require('https');
var quot = {};

exports.query = function (req, res) {
  res.json(quot);
};

var refresh =  function () {
  try {
    http.get("http://data.btcchina.com/data/ticker", function (result) {
      var responseParts = [];
      result.setEncoding('utf8');
      result.on("data", function (chunk) {
        responseParts.push(chunk);
      });
      result.on("end", function () {
        try {
          //console.log('btcChina -> ' + responseParts.join(''));
          quot.btcChina = JSON.parse(responseParts.join(''));
        } catch (e) {
          console.error(e);
        }

      });
    }).setTimeout(5000,function(){
        console.log('btcChina timeout......');
      });

    https.get("https://data.fxbtc.com/api?op=query_ticker&symbol=btc_cny", function (result) {
      var responseParts = [];
      result.setEncoding('utf8');
      result.on("data", function (chunk) {
        responseParts.push(chunk);
      });
      result.on("end", function () {
        try {
          //console.log('fxBtc -> ' + responseParts.join(''));
          quot.fxBtc = JSON.parse(responseParts.join(''));
        } catch (e) {
          console.error(e);
        }
      });
    }).setTimeout(5000,function(){
        console.log('fxBtc timeout......');
      });

    https.get("https://www.okcoin.com/api/ticker.do", function (result) {
      var responseParts = [];
      result.setEncoding('utf8');
      result.on("data", function (chunk) {
        responseParts.push(chunk);
      });
      result.on("end", function () {
        try {
          //console.log('okcoin -> ' + responseParts.join(''));
          quot.okcoin = JSON.parse(responseParts.join(''));
        } catch (e) {
          console.error(e);
        }
      });
    }).setTimeout(5000,function(){
        console.log('okcoin timeout......');
      });

    https.get("https://data.mtgox.com/api/2/BTCUSD/money/ticker", function (result) {
      var responseParts = [];
      result.setEncoding('utf8');
      result.on("data", function (chunk) {
        responseParts.push(chunk);
      });
      result.on("end", function () {
        try {
          //console.log('mtgox -> ' + responseParts.join(''));
          quot.mtgox = JSON.parse(responseParts.join(''));
        } catch (e) {
          console.error(e);
        }
      });
    }).setTimeout(5000,function(){
        console.log('mtgox timeout......');
      });

    https.get("https://www.bitstamp.net/api/ticker/", function (result) {
      var responseParts = [];
      result.setEncoding('utf8');
      result.on("data", function (chunk) {
        responseParts.push(chunk);
      });
      result.on("end", function () {
        try {
          //console.log('bitstamp -> ' + responseParts.join(''));
          quot.bitstamp = JSON.parse(responseParts.join(''));
        } catch (e) {
          console.error(e);
        }
      });
    }).setTimeout(5000,function(){
        console.log('bitstamp timeout......');
      });;

    http.get("http://api.796.com/apiV2/ticker.html?op=futures", function (result) {
      var responseParts = [];
      result.setEncoding('utf8');
      result.on("data", function (chunk) {
        responseParts.push(chunk);
      });
      result.on("end", function () {
        try {
          //console.log('q796 -> ' + responseParts.join(''));
          quot.q796 = JSON.parse(responseParts.join(''));
        } catch (e) {
          console.error(e);
        }
      });
    }).setTimeout(5000,function(){
        console.log('q796 timeout......');
      });
  } catch (e) {
    console.error(e);
  }
}

setInterval(refresh, 5000);