const express = require('express')
const app = express()
const morgan = require('morgan');
var port = process.env.PORT || 8080
let apiRoutes = require("./routes")
let bodyParser = require('body-parser');
let mongoose = require('mongoose');

//middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
// mongoose.connect('mongodb://api:12345678shit@ds111065.mlab.com:11065/shit',{ useNewUrlParser: true });
var db = mongoose.connection;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Header', 'Origin, X-Request-With, Content-Type, Accept, Authorization ')
    if(req.method == 'OPTIONS'){
        res.header('Access-Control-Allow-Method', 'PUT, POST,PATCH, DELETE, GET')
        return res.status(200).json({});
    }
    next();
});


// route
app.use('/shit', apiRoutes)


app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

//listen
app.listen(port, ()=>{
    console.log("SERVER STARTED")
});