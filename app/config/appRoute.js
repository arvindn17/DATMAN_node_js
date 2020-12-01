"use strict";
module.exports =  (app) => {
    var transaction = require("../controller/transactionController.js");
    // Routes will handle request
    app.route("/paymentDetail")
        .get(transaction.getAllTransactions);
    
    app.route("/doPayment")
        .post(transaction.createPayment);
    // remaining route    
    app.use(function(req, res, next) {
            res.json( { 'status' : 404, 'msg' : "url not found"});
     });
     app.use(function(err, req, res, next) {
        res.status( 500);
        res.json( { 'status' : 500, 'msg' : err.message});
       
    }); 
}