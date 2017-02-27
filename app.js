// set variables for environment
var express = require('express');
var app = express();
var path = require('path');
const fs = require('fs');
var bodyParser = require("body-parser");
if (process.env.REDISTOGO_URL) {
  var rtg   = require("url").parse(process.env.REDISTOGO_URL);
  var client = require("redis").createClient(rtg.port, rtg.hostname);
  client.auth(rtg.auth.split(":")[1]);
} else {
  var client = require("redis").createClient();
}

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

app.get('/super-secret-path', function(req, res) {
  client.lrange("rsvps", 0, -1, function(err, rsvps){
    console.log(rsvps);
    var jsonRsvps = [];
    for (var i = 0; i < rsvps.length; i++) {
      jsonRsvps.push(JSON.parse(rsvps[i]));
    }
    res.send(jsonRsvps);
  });
});

app.post('/', function(req, res) {
  client.lpush("rsvps", JSON.stringify(req.body), function(err, reply){
    console.log(reply);
    console.log("--------------------------")
    console.log("RSVP Submitted")
    console.log("--------------------------")
    console.log(req.body)
    console.log("--------------------------")
  });
});
// Set server port
app.listen(process.env.PORT || 4000)
console.log('Website Running');