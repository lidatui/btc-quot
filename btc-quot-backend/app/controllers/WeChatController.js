
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
      text.push('最新价: '+ quot.btcchina.CNY.last +'\n');
      text.push('买入价: '+ quot.btcchina.CNY.buy +'\n');
      text.push('卖出价: '+ quot.btcchina.CNY.sell +'\n');
      text.push('最高价: '+ quot.btcchina.CNY.high +'\n');
      text.push('最低价: '+ quot.btcchina.CNY.low +'\n');
      text.push('成交量: '+ quot.btcchina.CNY.vol.toFixed(2) +'\n');
      text.push('\n');

      res.reply({
        content: text.join(''),
        type: 'text'
      });
    }
  }));
};