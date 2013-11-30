
var wechat = require('wechat');

var QuotService = require('../services/QuotService');

module.exports = function(app){

  app.get('/wechat', wechat('19821126', function (req, res, next) {
    // 微信输入信息都在req.weixin上
    var message = req.weixin;
    console.log('wechat fromUserName: ' + message.FromUserName +
      ', wechat content: ' + message.Content);

    if(message.Content === 'hq'){
      var quot = QuotService.find();
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
  }));
};