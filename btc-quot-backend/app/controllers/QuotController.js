
var QuotService = require('../services/QuotService');

module.exports = function(app){

  app.get('/', function(req, res){
    res.redirect('/index.html');
  });

  app.get('/quot', function (req, res) {
    res.json(QuotService.find());
  });
};