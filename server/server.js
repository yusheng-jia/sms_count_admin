global.postgresserver = 'postgres://postgres:postgres@localhost:5432/caesarui';
global.jwtsecret =  'th1s1sn0t0nlyths3cr3tbutth3m0st1mp0rtAntp13c30f1nf0rmAt10nf0rth1sAppl1cAt10n';
global.cacheskills = false;

var express = require('express');
var proxy = require('http-proxy-middleware');
var bodyParser = require('body-parser');
var app = express();
var request = require('request');
var routes = require('./routes/index')
var cors = require('cors')
var jwt = require('jsonwebtoken');

const db = require('./db/db')
const url = require('url');

app.use(cors())
app.use(bodyParser.urlencoded({
    parameterLimit: 10000,
    limit: '2mb',
    extended: true
  }));
app.use(bodyParser.json({ limit: '2mb' }));
/** Serve static files for UI website on root / */
app.use('/', express.static('web/src/'));
app.use('/scripts', express.static('node_modules/'));

// route middleware to verify a token
app.use(function(req, res, next) {
  if(!req.headers.authorization) {
    if(req.originalUrl.endsWith('auth') || req.originalUrl.endsWith('authclient')){
      console.log("No Token, but got an Auth request. Allowing it");
      next();
    }else{
      return  res.status(401).send({
          success: false,
          message: 'No Authorization header.'
      });
    }
  }else {
    // read token and check it
    if (req.headers.authorization.split(' ')[0] === 'Bearer'){
        var token = req.headers.authorization.split(' ')[1];
        // verifies secret and checks exp
        jwt.verify(token, global.jwtsecret, function(err, decoded) {
          if (err) {
            return res.json({ success: false, message: 'Failed to authenticate token.' });
          } else {
            // if everything is good, save to request for use in other routes
            req.jwt = decoded;
            req.original_token=token;
            next();
          }
        });
    }else{
      // if there is no token send error..angularjs/ chat clients  will figure how to create the token.
      return res.status(401).send({
          success: false,
          message: 'No token provided.'
      });
    }
  }
});

var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

const NodeCache = require( "node-cache" );
//https://github.com/mpneuried/nodecache
const socketCache =  new NodeCache({useClones: false});
app.set("socketCache",socketCache);
// Socket.io Communication
io.sockets.on('connection', function (socket) {
  var jwt0='';
  console.log("All Cookies: " + socket.request.headers.cookie);
  try{
    var cookieArr =socket.request.headers.cookie.split(";");
    for (var i=0;i<cookieArr.length;i++){
      if(cookieArr[i].split("=")[0].trim()==='loggedinjwt'){
        jwt0=(cookieArr[i].split("=")[1]).split(".")[0];
        break;
      }
    }
  console.log("Adding Socket to Sockets List");
  app.get("socketCache").set(jwt0, socket);
  }catch (err) {
    console.log('Problem when parsing the cookies. Ignoring socket' + err);
  }

  socket.on('disconnect', function(){
    console.log("Disconnecting All Cookies: " + socket.request.headers.cookie);
    console.log('Socket disconnected');
    var discjwt0='';
    try{
      var cookieArr =socket.request.headers.cookie.split(";");
      for (var i=0;i<cookieArr.length;i++){
        if(cookieArr[i].split("=")[0].trim()==='loggedinjwt'){
          discjwt0=(cookieArr[i].split("=")[1]).split(".")[0];
          break;
        }
      }
      console.log("Removing SOCKET: "+discjwt0+" from List: "+ JSON.stringify(app.get("socketCache").keys()));
      app.get("socketCache").del(jwt0);
    }catch (err) {
      console.log('Problem when parsing the cookies. Unable to delete socket' + err);
    }
  });
});

app.use('/api/v1/', routes);

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status( err.code || 500 )
    .json({
      status: 'error',
      message: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500)
  .json({
    status: 'error',
    message: err.message
  });
});

var listener = server.listen(5002,function () {
  console.log('Express server listening on port ' + 5002);
});

checkCaesarUI();
// checkDB();

function checkCaesarUI() {
  console.log('');
}

function checkDB() {
  var dbconn = process.env.postgresserver != undefined ? 'process.env.postgresserver' : 'package.json';
  db.one('select current_database(), current_schema(), inet_server_port(), inet_server_addr()')
    .then(function (data) {
      console.log('');
      console.log('Postgres DB Connected');
      console.log('Using connection string from: ' + dbconn);
      console.log('Postgres Server: ' + data["inet_server_addr"] + ':' + data["inet_server_port"]);
      console.log('Database:' + data["current_database"]);
      console.log('Schema:' + data["current_schema"]);
      console.log('');
    })
    .catch(function (err) {
      console.log('Postgres DB Connection Error: ' + err);
      console.log('Using connection string from: ' + dbconn);
    });
}
