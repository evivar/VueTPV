const express = require('express');
const api = require('./api');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/tpvPOS', { useFindAndModify: false });
const db = mongoose.connection;

const app = express();

app.set('port', (process.env.PORT || 8081));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', api);

app.use(express.static('static'));

app.use(morgan('dev'));

app.use(function(request, response, next) {
    const err = new Error('Not Found');
    err.status = 404;
    response.json(err);
})

db.on('error', console.error.bind(console, 'Connection error'));

db.once('open', function() {
    console.log('Connected to MongoDB');
    app.listen(app.get('port'), function() {
        console.log('API Server Listening on port ' + app.get('port'));
    });
});