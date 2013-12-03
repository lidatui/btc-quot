

var express = require('express')
  , fs = require('fs')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/app/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.compress());
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());
  app.use(express.query());
  app.use(express.cookieParser('your secret here'));
  app.use(express.cookieSession());
  app.use(express.csrf());
  app.use(express.static(path.join(__dirname, '/static')));
  app.use(function(err, req, res, next){
    console.error(err.stack);
    res.send(500, 'Something broke!');
  });
  app.use(function(req, res, next) {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    next();
  });
});


// models
var models_path = __dirname + '/app/models'
  , model_files = fs.readdirSync(models_path)
model_files.forEach(function (file) {
  require(models_path+'/'+file)
})

// services
var services_path = __dirname + '/app/services'
  , service_files = fs.readdirSync(services_path)
service_files.forEach(function (file) {
  require(services_path+'/'+file)
})

// controllers
var controllers_path = __dirname + '/app/controllers'
  , controller_files = fs.readdirSync(controllers_path);
controller_files.forEach(function (file) {
  require(controllers_path+'/'+file)(app);
})

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

process.on('uncaughtException',function(e){
  console.log(e.toString());
});
