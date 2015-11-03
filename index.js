var express = require('express');
var bodyParser = require('body-parser');

var SERVER_URL = 'http://localhost:8000';

var app = express();
app.use(bodyParser.json());

app.get('/original', function(req, res) {
  req.query.method = 'GET';
  req.query.original = true;

  res.send(req.query);
});

app.post('/original', function(req, res) {
  req.body.method = 'POST';
  req.body.original = true;

  res.send(req.body);
});

var server = app.listen(8000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
