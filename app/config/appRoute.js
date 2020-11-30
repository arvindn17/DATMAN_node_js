"use strict";
module.exports =  (app) => {
    var transaction = require("../controller/transactionController.js");
    //payment Routes
    app.route("/paymentDetail")
        .get(transaction.getAllTransactions);
    
    app.route("/doPayment")
        .post(transaction.createPayment);
}