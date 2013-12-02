var http = require('http');
var https = require('https');


var QuotData = {
  mtgox: {
    market: 'mtgox',
    title: 'MT.GOX',
    url: 'https://www.mtgox.com'
  },
  bitstamp: {
    market: 'bitstamp',
    title: 'Bitstamp',
    url: 'https://www.bitstamp.net/'
  },
  q796: {
    market: 'q796',
    title: '796期货',
    url: 'https://796.com/'
  },

  btcchina: {
    market: 'btcchina',
    title: 'BTC中国',
    url: 'http://www.btcchina.com'
  },
  fxbtc: {
    market: 'fxbtc',
    title: 'FXBTC',
    url: 'http://www.fxbtc.com'
  },
  okcoin: {
    market: 'okcoin',
    title: 'OKCOIN',
    url: 'https://www.okcoin.com'
  },
  chbtc: {
    market: 'chbtc',
    title: '中国比特币',
    url: 'https://www.chbtc.com'
  }


}

var tinker = function(url,callback,timeout){
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
  }).setTimeout( timeout? timeout : 10000,function(){
      console.log(url+' timeout......');
    });
}



var btcchinaTinker = function(){
  tinker("http://data.btcchina.com/data/ticker",function(data){
    QuotData.btcchina.CNY = {
      time: new Date(),
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
  console.log('fxbtc tinker....');
  tinker("https://data.fxbtc.com/api?op=query_ticker&symbol=btc_cny",function(data){
    QuotData.fxbtc.CNY = {
      time: new Date(),
      last: parseFloat(data.ticker.last_rate),
      buy: parseFloat(data.ticker.bid),
      sell: parseFloat(data.ticker.ask),
      high: parseFloat(data.ticker.high),
      low: parseFloat(data.ticker.low),
      vol: parseFloat(data.ticker.vol)
    }
    console.log('fxbtc tinker....done');
  },30000);

}

var chbtcTinker = function(){
  tinker("http://api.chbtc.com/data/ticker",function(data){
    QuotData.chbtc.CNY = {
      time: new Date(),
      last: parseFloat(data.ticker.last),
      buy: parseFloat(data.ticker.buy),
      sell: parseFloat(data.ticker.sell),
      high: parseFloat(data.ticker.high),
      low: parseFloat(data.ticker.low),
      vol: parseFloat(data.ticker.vol)
    }
  });
}


var okcoinTinker = function(){
  tinker("https://www.okcoin.com/api/ticker.do",function(data){
    QuotData.okcoin.CNY = {
      time: new Date(),
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
      time: new Date(),
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
      time: new Date(),
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
      time: new Date(),
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
      time: new Date(),
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
setInterval(fxbtcTinker,30000);
setInterval(chbtcTinker,10000);
setInterval(okcoinTinker,10000);
setInterval(mtgoxCNYTinker,10000);
setInterval(mtgoxUSDTinker,10000);
setInterval(bitstampUSDTinker,10000);
setInterval(q796USDTinker,10000);


exports.find = function(){
  var quotList = [];
  for(var key in QuotData){
    quotList.push(QuotData[key]);
  }
   return quotList;
};