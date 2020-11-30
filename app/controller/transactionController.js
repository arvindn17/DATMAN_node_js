"use strict";

var Transaction = require("../model/TransactionModel.js");
var Client = require("../model/clientModel.js");
var TransactionLog = require("../model/transactionLogModel.js");
var  isValidTransaction = (TransactionObj) =>{
    var exemptAmount =0;
    if( TransactionObj.hasOwnProperty('service_tax') && ! isNaN(TransactionObj.service_tax) ){
        exemptAmount =  TransactionObj.service_tax;
    } 
    if( TransactionObj.hasOwnProperty('vat') && ! isNaN(TransactionObj.vat) ) {
        exemptAmount +=  TransactionObj.vat;
    }
    if(TransactionObj.amount - exemptAmount <=0  ) {
        return false;
    }

    if( !TransactionObj.amount || !TransactionObj.client_id || !TransactionObj.refno || !TransactionObj.currency ) {
        return false;
    }
    return true;
}
function getSerCharge ( TransactionObj, clientSerChargeRate) {
    var exemptAmount =0;
    if( TransactionObj.hasOwnProperty('service_tax') && ! isNaN(TransactionObj.service_tax) ){
        exemptAmount =  TransactionObj.service_tax;
    } 
    if( TransactionObj.hasOwnProperty('vat') && ! isNaN(TransactionObj.vat) ) {
        exemptAmount +=  TransactionObj.vat;
    }
    return (TransactionObj.amount - exemptAmount) * clientSerChargeRate /100;
}

function sendErrorResponse(errorCode, msg){
    console.log("err : "+msg);
    res.status(500).send({ 'status' : 500, 'msg' :msg});
}

exports.createPayment = (req, res) => {
    var newLog = new TransactionLog( { "request" : JSON.stringify(req.body),'response' : '','txn_id' : 0, 'action' : 'transaction'  });    
    TransactionLog.createLog(newLog,(err, log) => {
        if(err) {
            sendErrorResponse(500, "log couldn't be saved ");
            return;
        }
        var logId = log.insertId;
        console.log("log saved \n transaction start \n");
        var newTransaction = new Transaction(req.body);
        if( !isValidTransaction(newTransaction) ) {
            sendErrorResponse(500, 'Please provide mandatory parameter in proper format' );
            return;
        }
        Client.getClientById( newTransaction.client_id, (err,result) => {
            if(err) {
                sendErrorResponse(500, "client detail not found");
                return;
            }
            newTransaction.ser_charge = getSerCharge(newTransaction, result[0]["ser_charge_rate"]);
            Transaction.createTransaction(newTransaction, (err, Transaction) => {
                if(err) {
                    sendErrorResponse(500, err.message);
                    return;
                }
                var clientBalance =  newTransaction.amount - newTransaction.ser_charge;
                Client.updateById(newTransaction.client_id, clientBalance, (err,res)=>{
                    if(err) {
                        sendErrorResponse(500, err.message);
                        return;
                    }
                });
                var response = {"status" : 200, 'refrence': Transaction.insertId};
                newLog.response = JSON.stringify(response);
                newLog.txn_id = Transaction.insertId;
                TransactionLog.updateLogById( logId, newLog, (err, result) => {
                    if(err) {
                        sendErrorResponse(500, err.message);
                        return;
                    }
                });
                res.status(200).send( response );
            });
              
        });
    });
    
}

exports.getAllTransactions = (req , res) => {
    Transaction.getAllTransaction( (err , Transaction) => {
        console.log("Transaction Controller");
        if(err) 
            res.status(500).json( { 'status' : 500, 'msg' : err.message});
        console.log( "res" , Transaction);
        res.send(Transaction);    
    });
} 


