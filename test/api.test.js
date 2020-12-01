const app = require('../server.js');
const request = require('supertest');
const { expect } = require('chai');

describe('POST /doPayment', function() {
    it('api response should be json', function(done) {
    request(app)
      .post('/doPayment')
      .send({
        amount: 1000,
        client_id: 1,
        refno: "123459667",
        service_tax: 10,
        vat: 10,
        currency: "inr",
        ser_charge: 1,
        line_items : "mobile"
      })
      .set('Accept', 'application/json')
      .expect(200)
      .expect("Content-type",/json/)
      .end((err,res)=>{
        expect(res.body).to.be.an('object');
        done()
      })
    });

    it('api response should return valid param', function(done) {
    request(app)
      .post('/doPayment')
      .send({
        amount: 1000,
        client_id: 1,
        refno: "123459667",
        
        currency: "inr",
        ser_charge: 1,
        line_items : "mobile"
      })
      .set('Accept', 'application/json')
      .end((err,res)=>{
        expect(res.body).to.have.own.property('status');
        expect(res.body).to.have.own.property('refrence');
        done()
      })
    });
   
  });