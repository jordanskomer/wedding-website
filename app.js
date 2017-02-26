// set variables for environment
var express = require('express');
var app = express();
var path = require('path');
const fs = require('fs');
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

app.post('/', function(req, res) {
  fs.readFile('rsvps.json', function (err, data) {
    var json = JSON.parse(data);
    json.push(req.body);
    console.log(json);
    fs.writeFile("rsvps.json", JSON.stringify(json), function(err) {
      if(err) {
          return console.log(err);
      }
      console.log("--------------------------")
      console.log("RSVP Submitted")
      console.log("--------------------------")
      console.log(req.body)
      console.log("--------------------------")
    });
  });
});
// Set server port
app.listen(process.env.PORT || 4000)
console.log('Website Running');