/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  suite('Routing Tests', function() {
    
    suite('GET /api/convert => conversion object', function() {
      
      test('Convert 10L (valid input)', function(done) {
       chai.request(server)
        .get('/api/convert')
        .query({input: '10L'})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.initNum, 10);
          assert.equal(res.body.initUnit, 'L');
          assert.approximately(res.body.returnNum, 2.64172, 0.1);
          assert.equal(res.body.returnUnit, 'gal');
        });
      done();
     });
      
      test('Convert 32g (invalid input unit)', function(done) {
        chai.request(server)
          .get('/api/convert')
          .query({input: '32g'})
          .end((err, res) => {
            assert.equal(res.status, 200, 'status 200');
            assert.equal(res.text, 'invalid unit');
          });
        done();
      });
      
      test('Convert 3/7.2/4kg (invalid number)', done => {
        chai.request(server)
          .get('/api/convert')
          .query({input: '3/7.2/4kg'})
          .end((req, res) => {
            assert.equal(res.status, 200, 'status 200');
            assert.equal(res.text, 'invalid number');
          });
        done();
      });  
      
      test('Convert 3/7.2/4kilomegagram (invalid number and unit)', function(done) {
        chai.request(server)
          .get('/api/convert')
          .query({input: '3/7.2/4kilomegagram'})
          .end((req, res) => {
            assert.equal(res.status, 200, 'response 200');
            assert.equal(res.text, 'invalid number and unit');
          });
        done();
      });
      
      test('Convert kg (no number)', function(done) {
        chai.request(server)
          .get('/api/convert')
          .query({input: 'kg'})
          .end((req, res) => {
            assert.equal(res.status, 200, '200 response');
            assert.equal(res.body.initNum, 1, 'initial number 1');
            assert.equal(res.body.initUnit, 'kg', 'initial unit kg');
            assert.approximately(res.body.returnNum, 2.2, .1, 'expect return num to be about 2.2');
            assert.equal(res.body.returnUnit, 'lbs');
          });
        done();
      });
      
    });

  });

});
