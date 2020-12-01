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
}