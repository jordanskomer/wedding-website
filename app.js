// set variables for environment
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const session = require('express-session');
const bodyParser = require("body-parser");

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
app.use(session({ secret: 'big booty', cookie: { maxAge: 1000 }}))

// Secure JSON Path
function checkAuth (req, res, next) {
  if (req.url === '/secured-rsvps' && (!req.session || !req.session.authenticated)) {
    res.redirect('/rsvps');
    return;
  }
  next();
}

app.use(checkAuth);

// set routes
app.get('/', function(req, res) {
  res.render('index');
});

app.get('/rsvps', function(req, res) {
  res.render('rsvps');
});

app.get('/logout', function(req, res) {
  req.session.authenticated = false;
  res.redirect('/');
});

app.post('/rsvps', function(req, res) {
  if (req.body.username && (req.body.username === 'admin' || req.body.username === 'mom') && req.body.password && (req.body.password === 'lovelyfirecracker' || req.body.password === 'T3nniswedding')) {
    req.session.authenticated = true;
    res.redirect('/secured-rsvps');
  } else {
    res.redirect('/rsvps');
  }
});

app.get('/secured-rsvps', function(req, res) {
  client.lrange("rsvps", 0, -1, function(err, rsvps){
    var jsonRsvps = [];
    var jsonRsvpsCount = {};
    jsonRsvpsCount.attending = [];
    jsonRsvpsCount.not_attending = [];
    for (var i = 0; i < rsvps.length; i++) {
      var rsvp = JSON.parse(rsvps[i])
      jsonRsvps.push(rsvp);

      if (rsvp.going == "yes") {
        if (jsonRsvpsCount.total_attending) {
          jsonRsvpsCount.total_attending = parseInt(jsonRsvpsCount.total_attending) + parseInt(rsvp.attending) + 1 + "";
        } else {
          jsonRsvpsCount.total_attending = parseInt(rsvp.attending) + 1 + "";
        }
        jsonRsvpsCount.attending.push(rsvp.name);
      } else {
        if (jsonRsvpsCount.total_not_attending) {
          jsonRsvpsCount.total_not_attending = parseInt(jsonRsvpsCount.total_not_attending) + 1 + "";
        } else {
          jsonRsvpsCount.total_not_attending = '1';
        }
        jsonRsvpsCount.not_attending.push(rsvp.name);
      }
    }

    jsonRsvps.push(jsonRsvpsCount);
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