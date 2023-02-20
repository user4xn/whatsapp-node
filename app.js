const express = require('express');
const router = require('./src/routes/index');
const cors = require('cors');
const createError = require('http-errors');
const apiResponse = require('./src/util/api-response');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1', router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('APP_ENV') === 'development' ? err : {};

    const code = err.status || 500;
    const response = apiResponse(err.message, code, "error",null)

    // render the error page
    res.status(err.status || 500);
    res.send(response);
});

module.exports = app;
