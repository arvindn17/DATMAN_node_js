
"use strict";
var sql = require('../config/db.js');

var TransactionLog = function(TransactionLog) {
    this.request = TransactionLog.request;
    this.response = TransactionLog.response;
    this.txn_id = TransactionLog.txn_id;
    this.action = TransactionLog.action;
}

TransactionLog.createLog = (newTransactionLog, result) => {
    sql.query(" insert into transaction_log set ? ", newTransactionLog , (err, res)=>{
        if( err ) {
            result(err , null);
        }
        else{
            result(null, res);
        }
    });
}

TransactionLog.getTransactionLogById = (TransactionLogId, result) => {
    sql.query("Select * from transaction_log where id = ? ", TransactionLogId, function (err, res) {             
        if(err) {
            result(err, null);
        }
        else{
            result(null, res);
        }
    });  
}

TransactionLog.updateLogById = (transactionLogId, Log, result) => {
    sql.query("update transaction_log set response = ?, txn_id = ? where id = ?", [ Log.response, Log.txn_id, transactionLogId ] ,(err, res) => {             
        if(err) {
            result(err, null);
        }
        else{
            result(null, res);
        }
    });  
}
module.exports =  TransactionLog;