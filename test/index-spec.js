'use strict';

var request = require('request');

var MOCK_DATA = {
  some: 1
};

describe('routes', function() {

  it('should respond to a get request', function(done) {
    request.get({
      url: 'http://localhost:8000/original',
      qs: MOCK_DATA
    }, function(err, res, body) {
      expect(err).toBeNull();
      expect(body).toEqual('{"some":"1","method":"GET","original":true}');
      done();
    });
  }, 5000);

  it('should ignore json body of a post request', function(done) {
    request.post({
      url: 'http://localhost:8000/original',
      json: MOCK_DATA,
      headers: {
        'Content-Type': 'application/json'
      },
    }, function(err, res, body) {
      expect(err).toBeNull();
      expect(body).toEqual({
        method: 'POST',
        original: true
      });

      done();
    });
  }, 5000);

  it('should respond to a post request', function(done) {
    request.post({
      url: 'http://localhost:8000/original',
      qs: MOCK_DATA,
    }, function(err, res, body) {
      expect(err).toBeNull();
      expect(body).toEqual('{"some":"1","method":"POST","original":true}');

      done();
    });
  }, 5000);

  it('should validate parameters', function(done) {
    request.post({
      url: 'http://localhost:8000/original',
      qs: {
        some: "info"
      },
    }, function(err, res, body) {
      expect(err).toBeNull();
      expect(body).toEqual('{"message":"Validation failed",' +
        '"errors":[{"code":"VALIDATION_INVALID_TYPE",' +
        '"message":"Invalid type: string should be integer",' +
        '"data":"info",' +
        '"path":"$.query.some"}]}');
      done();
    });
  }, 5000);

  describe('docs', function() {
    it('should respond with swagger json', function(done) {
      request.get({
        url: 'http://localhost:8000/api-docs',
        qs: MOCK_DATA
      }, function(err, res, body) {
        expect(err).toBeNull();
        expect(body).toEqual('{"swaggerVersion":"1.2","apis":[{"path":"/original","description":"Manage original routes"}]}');
        done();
      });
    }, 5000);
  });

});
