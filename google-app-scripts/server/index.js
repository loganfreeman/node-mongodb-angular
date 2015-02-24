/**
 * Module dependencies.
 */

var express = require('express');
var logger = require('morgan');
var app = express();

// log requests
app.use(logger('dev'));

// express on its own has no notion
// of a "file". The express.static()
// middleware checks for a file matching
// the `req.path` within the directory
// that you pass it. In this case "GET /js/app.js"
// will look for "./public/js/app.js".
app.use('docs', express.static(__dirname + '/../docs'));

app.use(express.static(__dirname + '/../'));

app.get('/', function(req, res){
	res.redirect('/scripts-doc.html');
})


app.listen(3000);
console.log('listening on port 3000');
