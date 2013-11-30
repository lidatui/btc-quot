var http = require('http');
var https = require('https');


var QuotData = {
  mtgox: {
    market: 'mtgox',
    title: 'MT.GOX',
    url: 'https://www.mtgox.com',
    order:0
  },
  bitstamp: {
    market: 'bitstamp',
    title: 'Bitstamp',
    url: 'https://www.bitstamp.net/',
    order:1
  },
  q796: {
    market: 'q796',
    title: '796期货',
    url: 'https://796.com/',
    order:2
  },

  btcchina: {
    market: 'btcchina',
    title: 'BTC中国',
    url: 'http://www.btcchina.com',
    order:3
  },
  fxbtc: {
    market: 'fxbtc',
    title: 'FXBTC',
    url: 'http://www.fxbtc.com',
    order:4
  },
  okcoin: {
    market: 'okcoin',
    title: 'OKCOIN',
    url: 'https://www.okcoin.com',
    order:5
  }


}

var tinker = function(url,callback){
  var protocol = http;
  if(url.indexOf('https') === 0){
    protocol = https;
  }
  protocol.get(url, function (result) {
    var responseParts = [];
    result.setEncoding('utf8');
    result.on("data", function (chunk) {
      responseParts.push(chunk);
    });
    result.on("end", function () {
      try {
        callback(JSON.parse(responseParts.join('')));
      } catch (e) {
        console.error(e);
      }
    });
  }).setTimeout(10000,function(){
      console.log(url+' timeout......');
    });
}



var btcchinaTinker = function(){
  tinker("http://data.btcchina.com/data/ticker",function(data){
    QuotData.btcchina.CNY = {
      last: parseFloat(data.ticker.last),
      buy: parseFloat(data.ticker.buy),
      sell: parseFloat(data.ticker.sell),
      high: parseFloat(data.ticker.high),
      low: parseFloat(data.ticker.low),
      vol: parseFloat(data.ticker.vol)
    }
  });
}

var fxbtcTinker = function(){
  tinker("https://data.fxbtc.com/api?op=query_ticker&symbol=btc_cny",function(data){
    QuotData.fxbtc.CNY = {
      last: parseFloat(data.ticker.last_rate),
      buy: parseFloat(data.ticker.bid),
      sell: parseFloat(data.ticker.ask),
      high: parseFloat(data.ticker.high),
      low: parseFloat(data.ticker.low),
      vol: parseFloat(data.ticker.vol)
    }
  });
}

var okcoinTinker = function(){
  tinker("https://www.okcoin.com/api/ticker.do",function(data){
    QuotData.okcoin.CNY = {
      last: parseFloat(data.ticker.last),
      buy: parseFloat(data.ticker.buy),
      sell: parseFloat(data.ticker.sell),
      high: parseFloat(data.ticker.high),
      low: parseFloat(data.ticker.low),
      vol: parseFloat(data.ticker.vol)
    }
  });
}

//-----------------------

var mtgoxCNYTinker = function(){
  tinker("https://data.mtgox.com/api/2/BTCCNY/money/ticker",function(data){
    QuotData.mtgox.CNY = {
      last: parseFloat(data.data.last.value),
      buy: parseFloat(data.data.buy.value),
      sell: parseFloat(data.data.sell.value),
      high: parseFloat(data.data.high.value),
      low: parseFloat(data.data.low.value),
      vol: parseFloat(data.data.vol.value)
    }
  });
}

var mtgoxUSDTinker = function(){
  tinker("https://data.mtgox.com/api/2/BTCUSD/money/ticker",function(data){
    QuotData.mtgox.USD = {
      last: parseFloat(data.data.last.value),
      buy: parseFloat(data.data.buy.value),
      sell: parseFloat(data.data.sell.value),
      high: parseFloat(data.data.high.value),
      low: parseFloat(data.data.low.value),
      vol: parseFloat(data.data.vol.value)
    }
  });
}

//----------------------

var bitstampUSDTinker = function(){
  tinker("https://www.bitstamp.net/api/ticker/",function(data){
    QuotData.bitstamp.USD = {
      last: parseFloat(data.last),
      buy: parseFloat(data.bid),
      sell: parseFloat(data.ask),
      high: parseFloat(data.high),
      low: parseFloat(data.low),
      vol: parseFloat(data.volume)
    }
  });
}

//---------------------

var q796USDTinker = function(){
  tinker("http://api.796.com/apiV2/ticker.html?op=futures",function(data){
    QuotData.q796.USD = {
      last: parseFloat(data.return.last),
      buy: parseFloat(data.return.buy),
      sell: parseFloat(data.return.sell),
      high: parseFloat(data.return.high),
      low: parseFloat(data.return.low),
      vol: parseFloat(data.return.vol)
    }
  });
}

setInterval(btcchinaTinker,5000);
setInterval(fxbtcTinker,10000);
setInterval(okcoinTinker,10000);
setInterval(mtgoxCNYTinker,10000);
setInterval(mtgoxUSDTinker,10000);
setInterval(bitstampUSDTinker,10000);
setInterval(q796USDTinker,10000);


exports.find = function(){
   return QuotData;
};