var express = require("express")
var app = express()
var bodyParser = require('body-parser')
port = process.env.port || 3000 
app.listen(port)

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());


var routes= require("./app/config/appRoute" );
routes(app);
module.exports = app;