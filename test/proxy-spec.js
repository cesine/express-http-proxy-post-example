'use strict';

var request = require('request');

var MOCK_DATA = {
  some: 'info'
};

describe('proxied routes', function() {

  it('should respond to a get request', function(done) {
    request.get({
      url: 'http://localhost:8001/original',
      qs: MOCK_DATA
    }, function(err, res, body) {
      expect(err).toBeNull();
      expect(body).toEqual('{"some":"info","method":"GET","original":true}');
      done();
    });
  }, 5000);

  it('should respond to a post request', function(done) {
    request.post({
      url: 'http://localhost:8001/original',
      json: MOCK_DATA,
      headers: {
        'Content-Type': 'application/json'
      },
    }, function(err, res, body) {
      expect(err).toBeNull();
      expect(body).toEqual({
        some: 'info',
        method: 'POST',
        original: true
      });

      done();
    });
  }, 5000);
});
