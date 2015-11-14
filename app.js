var express = require('express');
var dotenv = require('dotenv');
var cloudinary = require('cloudinary');
var app = express();

app.use(express.static(__dirname));
dotenv.load({
  silent: true
});

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/signature', function(req, res) {
  res.json({
    api_key: cloudinary.config().api_key,
    api_url: cloudinary.utils.api_url("destroy"),
    secret: cloudinary.utils.api_sign_request(req.query, cloudinary.config().api_secret)
  });
});

var server = app.listen(8080, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
