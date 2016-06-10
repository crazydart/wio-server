var express = require('express');
var exphbs = require('express-handlebars');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var svcauth = require('./routes/svc.auth');
var svcnodes = require('./routes/svc.nodes');

var app = express();

// view engine setup
// pp.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/js/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/css/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
app.use('/css/fonts', express.static(__dirname + '/node_modules/bootstrap/dist/fonts')); // redirect fonts bootstrap

app.use('/js/jquery', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery

app.use('/js/angular', express.static(__dirname + '/node_modules/angular')); // redirect angular JS
app.use('/js/angular-route', express.static(__dirname + '/node_modules/angular-route')); // redirect angular-route JS

// sqlite
var sqlite3 = require('sqlite3').verbose();
// var db = new sqlite3.Database(':memory:');
var db = new sqlite3.Database('wioserverdata.sqlite');
db.serialize(function () {
    db.run("CREATE TABLE if not exists authinfo (username TEXT, authtoken TEXT, userid TEXT, authdate DATETIME)");

    // var stmt = db.prepare("INSERT INTO authinfo VALUES (?, ?, ?)");
    // stmt.run("Test1", "token111", new Date());
    // stmt.finalize();

});
app.use(function (req, res, next) {

    console.log("added db");
    req.db = db;
    next();
});

// body parser
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));


// Routes
app.use('/', routes);
app.use('/svc/auth', svcauth);
app.use('/svc/nodes', svcnodes);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
