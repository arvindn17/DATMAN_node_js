
"use strict";
var sql = require('../config/db.js');

var Client = function(client){

    this.amount = client.amount;
    this.name = client.name;
}

Client.createCLIENT = function(newClient, result){

    sql.query(" insert into client set ? ", newClient , (err, res)=>{
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

Client.getClientById = (clientId, result) => {
    sql.query("Select * from client where id = ? ", clientId, function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });  
}

Client.getAllClient = (result) => {
    sql.query("Select * from client ",  (err, res) => {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log(res);
            return res;
        }
    });  
}

Client.updateById = function(id, amount, result){
    sql.query("UPDATE client SET amount = amount + ? WHERE id = ?", [ amount, id], function (err, res) {
    if(err) {
        result(null, err);
    }
    else   
        result(null, res);
    }); 
}

module.exports =  Client;