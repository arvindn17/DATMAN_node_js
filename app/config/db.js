"use strict";
var mysql = require("mysql");
var connection = mysql.createConnection({
    host : 'localhost',
    port : '8889',
    user : 'root',
    password : 'root',
    database : 'datman'
});
connection.connect((err) => {
    if(err) throw err;
});
module.exports = connection;


