
var wechat = require('wechat');

var QuotService = require('../services/QuotService');

module.exports = function(app){

  app.use('/wechat', wechat('19821126', function (req, res, next) {
    // 微信输入信息都在req.weixin上
    var message = req.weixin;
    console.log('wechat fromUserName: ' + message.FromUserName +
      ', wechat content: ' + message.Content);

    if(message.Content === 'btc'){
      var quotList = QuotService.find();
      var text = [];
      for(var i=0; i<quotList.length; i++){
         var quot = quotList[i];
        text.push(''+ quot.title +'\n');
        if(quot.USD){
          text.push('币种: 美元\n');
          text.push('最新价: '+ quot.USD.last.toFixed(2) +'\n');
          text.push('买入价: '+ quot.USD.buy.toFixed(2) +'\n');
          text.push('卖出价: '+ quot.USD.sell.toFixed(2) +'\n');
          text.push('最高价: '+ quot.USD.high.toFixed(2) +'\n');
          text.push('最低价: '+ quot.USD.low.toFixed(2) +'\n');
          text.push('成交量: '+ quot.USD.vol.toFixed(2) +'\n');
        }
        if(quot.CNY){
          text.push('币种: 人民币\n');
          text.push('最新价: '+ quot.CNY.last.toFixed(2) +'\n');
          text.push('买入价: '+ quot.CNY.buy.toFixed(2) +'\n');
          text.push('卖出价: '+ quot.CNY.sell.toFixed(2) +'\n');
          text.push('最高价: '+ quot.CNY.high.toFixed(2) +'\n');
          text.push('最低价: '+ quot.CNY.low.toFixed(2) +'\n');
          text.push('成交量: '+ quot.CNY.vol.toFixed(2) +'\n');
        }
        text.push('---------------\n');
      }

      res.reply({
        content: text.join(''),
        type: 'text'
      });
    }
  }));
};