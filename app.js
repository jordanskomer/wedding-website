// set variables for environment
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require("body-parser");


// views as directory for all template files
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// instruct express to server up static assets
app.use(express.static('public'));

// set routes
app.get('/', function(req, res) {
  res.render('index');
});

app.get('/rsvp', function(req, res) {
  res.render('rsvp');
});

app.post('/rsvp', function(req, res) {
  console.log(req);
});
// Set server port
app.listen(4000);
console.log('server is running');