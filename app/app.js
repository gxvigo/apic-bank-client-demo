/*eslint-env node*/


// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');
var myHttp = require('http');
var http = require('http-request');
var reload = require('reload');


// create a new express server
var app = express();



// Add headers (CORS)
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

// serve the files out of ./public as our main files
console.log('Express static public directory: ' + __dirname + '/public');
app.use(express.static(__dirname + '/public'));

// next line make the app 'cloud' enabled, depending if the VCAP var exist (Bluemix) or not the server is started with 
// different parameters
var port = (process.env.VCAP_APP_PORT || 3000); var host = (process.env.VCAP_APP_HOST || 'localhost');

// Reload (automatica browser refresh) code here 
var server = myHttp.createServer(app);
reload(server, app);

// // start server on the specified port and binding host
server.listen(port, host, function() {

	// print a message when the server starts listening
  console.log("Server started on host " + host + " port " + port);
});