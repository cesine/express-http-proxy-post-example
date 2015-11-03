var express = require('express');
var proxy = require('express-http-proxy');

var app = express();
var SERVER_URL = 'http://localhost:8000';

app.get('/original', proxy(SERVER_URL, {
  intercept: function(rsp, data, req, res, callback) {
    data = JSON.parse(data.toString('utf8'));
    data.proxied = true;
    callback(null, JSON.stringify(data));
  }
}));

app.post('/original', proxy(SERVER_URL, {
  intercept: function(rsp, data, req, res, callback) {
    data = JSON.parse(data.toString('utf8'));
    data.proxied = true;
    callback(null, JSON.stringify(data));
  }
}));

app.get('/api-docs', proxy(SERVER_URL, {
  intercept: function(rsp, data, req, res, callback) {
    data = JSON.parse(data.toString('utf8'));
    data.proxied = true;
    callback(null, JSON.stringify(data));
  }
}));

var server = app.listen(8001, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example proxy listening at http://%s:%s', host, port);
});
