// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var bodyParser= require('body-parser')
app.use(bodyParser.json()); 

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// default route 

app.get('/api/timestamp/:datValue?',function(req,res){  //":---?" at the end very important 
     
    if(!req.params || !req.params.datValue)
    {
      res.json({unix : new Date().getTime(), utc : new Date().toUTCString() });
    }

    let d= req.params.datValue
    var datVal;

    datVal= new Date(d);
    if(!datVal){
      res.json( {error : "Invalid Date" } );
    }
    else if(!isNaN(d)){
      var unixd = d;
      d=parseInt(d);
      datVal= new Date(d);

      var utcd= datVal.toUTCString();
    }
    else {
      var unixd = datVal.getTime();
      var utcd= datVal.toUTCString();
    }
    if( unixd && utcd )
      res.json({unix : unixd, utc : utcd });
    else
    res.json( {error : "Invalid Date" } );
     
    
});

app.get("/*", function (req, res) {
  res.sendFile(__dirname + '/views/404.html');
});


// listen for requests :)  process.env.PORT  CHANGE afterwards
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});