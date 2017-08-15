const express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    morgan = require('morgan'),
    path = require('path'),
    mongoose = require('mongoose'),

    config = require('./config'),
    reviews = require('./routes/review.routes.js');

const app = express();

// Connect database
mongoose.connect(config.mongoURL, (err) => {
    if (err) {
        console.error('Database connection error', err);
        throw err;
    }
});

// Enable cors for all clients
app.use(cors());

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Register api routes
app.use('/api', reviews);

module.exports = app;