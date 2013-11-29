
var http = require('http');
var https = require('https');
var wechat = require('wechat');


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



exports.wechat = wechat('19821126', function (req, res, next) {
  // 微信输入信息都在req.weixin上
  var message = req.weixin;
  console.log('wechat toUserName: ' + message.ToUserName);
  console.log('wechat fromUserName: ' + message.FromUserName);
  console.log('wechat content: ' + message.Content);

  if(message.Content === 'hq'){
    var text = [];
    text.push('btcChina:\n')
    text.push('最新价: '+ quot.btcChina.ticker.last +'\n');
    text.push('买入价: '+ quot.btcChina.ticker.buy +'\n');
    text.push('卖出价: '+ quot.btcChina.ticker.sell +'\n');
    text.push('最高价: '+ quot.btcChina.ticker.high +'\n');
    text.push('最低价: '+ quot.btcChina.ticker.low +'\n');
    text.push('成交量: '+ parseFloat(quot.btcChina.ticker.vol).toFixed(2) +'\n');
    text.push('\n');

    text.push('fxBtc:\n')
    text.push('最新价: '+ quot.fxBtc.ticker.last_rate +'\n');
    text.push('买入价: '+ quot.fxBtc.ticker.bid +'\n');
    text.push('卖出价: '+ quot.fxBtc.ticker.ask +'\n');
    text.push('最高价: '+ quot.fxBtc.ticker.high +'\n');
    text.push('最低价: '+ quot.fxBtc.ticker.low +'\n');
    text.push('成交量: '+ parseFloat(quot.fxBtc.ticker.vol).toFixed(2) +'\n');
    text.push('\n');

    text.push('okcoin:\n')
    text.push('最新价: '+ quot.okcoin.ticker.last +'\n');
    text.push('买入价: '+ quot.okcoin.ticker.buy +'\n');
    text.push('卖出价: '+ quot.okcoin.ticker.sell +'\n');
    text.push('最高价: '+ quot.okcoin.ticker.high +'\n');
    text.push('最低价: '+ quot.okcoin.ticker.low +'\n');
    text.push('成交量: '+ parseFloat(quot.okcoin.ticker.vol).toFixed(2) +'\n');
    res.reply({
      content: text.join(''),
      type: 'text'
    });
  }
});