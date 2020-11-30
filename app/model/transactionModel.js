
"use strict";
var sql = require('../config/db.js');

var Payment = function(payment){

    this.amount = payment.amount;
    this.client_id = payment.client_id;
    this.refno = payment.refno;
    this.service_tax = payment.service_tax;
    this.vat = payment.vat;
    this.currency = payment.currency;
    this.ser_charge = payment.ser_charge;
    this.line_items = payment.line_items;

}

Payment.createTransaction = function(newPayment, result){
    newPayment.status = 'init';
    sql.query(" insert into transaction set ? ", newPayment , (err, res)=>{
        if(err) {
            console.log("error", err);
            result(err , null);
        }
        else{
            console.log("record insert id is "+res.insertId);
            result(null, res);
        }
    });
}

Payment.getPaymentById = (paymentId, result) => {
    sql.query("Select task from transaction where id = ? ", paymentId, function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });  
}

Payment.getAllTransaction = (result) => {
    sql.query("Select * from transaction ", function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log(res);
            result(null, res);
        }
    });  
}

module.exports =  Payment;