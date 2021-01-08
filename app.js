var express = require('express')
var app = express()
const path = require('path');
const bodyParser = require('body-parser');
var cors = require('cors')

var https = require('https')
var fs = require('fs')
const {PORT} = require('./config/app');

const constants = require('./config/strings/constant')

//Authentication
const passport    = require('passport');

//Routes
const routes = require('./api/routes/routes')
const secureRoutes = require('./api/routes/secure-routes')
const loanTeam = require('./api/routes/loan-team')
const borrowerInfo = require('./api/routes/borrower-info')
const propertyAndLoan = require('./api/routes/property-and-loan')
const EquifaxCreditScore = require('./api/routes/creditScore')
const LoanTracking = require('./api/routes/loanTracking')


app.use(express.static(path.join(__dirname, '/dist-27-july/finmae-frontend')));
require('./config/passport');

//Error Handling
const { handleError } = require('./exceptions/error');

// app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' })) // for parsing application/
// app.use(bodyParser.json({limit: '50mb'}));
// app.use(cors());
app.use(cors());
app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}));

app.use(express.static(__dirname + '/image/company'));
app.use(express.static(__dirname + '/image/locationImage'));
// app.use(express.static(__dirname + '/image/sampleNewspaper'));
// app.use(express.static(__dirname + '/image/orders'));

app.use(passport.initialize());

// app.use(function (req, res, next) {
//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,bearer');
 
// });

if (!fs.existsSync('./image')) { fs.mkdirSync('./image'); }
if (!fs.existsSync('./image/company')) { fs.mkdirSync('./image/company') }
if (!fs.existsSync('./image/locationImage')) { fs.mkdirSync('./image/locationImage') }


//Routes
routes(app)
secureRoutes(app)
loanTeam(app)
borrowerInfo(app)
propertyAndLoan(app)
EquifaxCreditScore(app)
LoanTracking(app)

app.use(function (req, res, next) {
    const err = new Error(constants.ERROR.UNAVAILABLE_API);
    err.status = constants.HTTP_STATUS.METHOD_NOT_ALLOWED;
    err.errors = constants.ERROR.UNAVAILABLE_API;
    next(err);
});

// Default error handler
app.use((err, req, res, next) => {
    console.log('err: ', err);
    res.status(err.hasOwnProperty('status') ? err.status : 500);
    res.json({
        message: err.hasOwnProperty('errors') ? err.errors : err.toString()
    });
});

// app.use(function(err, req, res, next) {    
//     handleError(err, res)
// });

app.listen(PORT, () => console.log(`Example app listeninssg on port ` + PORT))

// app.use(function(req, res) {
//     res.status(404).send({url: req.originalUrl + ' not found'})
// });