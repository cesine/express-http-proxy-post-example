'use strict';

var express = require('express');
var swagger = require('swagger-framework');

var host = 'localhost';
var port = process.env.PORT || 8000;
var url = 'http://' + host + ':' + port;

var framework = swagger.Framework({
  basePath: url
});

var originalAPI = framework.api({
  'path': '/original',
  'description': 'Manage original routes',
  'consumes': [
    'application/json',
    // 'application/x-www-form-urlencoded'
  ],
  'produces': [
    'application/json'
  ]
});

var original = originalAPI.resource({
  'path': '/original'
});

original.operation({
  'method': 'GET',
  'summary': 'Get original route',
  'notes': 'Returns the data which was sent',
  'type': 'Original',
  'nickname': 'getOriginal',
  'parameters': [],
  'responseMessages': []
}, function handler(req, res) {
  req.query.method = 'GET';
  req.query.original = true;

  res.send(req.query);
});

original.operation({
  'method': 'POST',
  'summary': 'Post original route',
  'notes': 'Returns the data which was sent',
  'type': 'Original',
  'nickname': 'postOriginal',
  'parameters': [{
    'name': 'some',
    'description': 'Some bit of data',
    'required': false,
    'type': 'integer',
    'format': 'int64',
    'paramType': 'query'
  }],
  'responseMessages': []
}, function handler(req, res) {
  req.query.method = 'POST';
  req.query.original = true;

  res.send(req.query);
});

originalAPI.model({
  'id': 'Original',
  'required': ['some'],
  'properties': {
    'some': {
      'type': 'string'
    }
  }
});

var app = express();

app.use('/api-docs', framework.docs.dispatcher());
app.use(framework.dispatcher());

app.use('/', function(req, res) {
  res.sf.reply(404, {
    message: 'Not found: see ' + url + '/api-docs'
  });
});

var server = app.listen(8000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
