const express = require('express');
const serverless = require('serverless-http');
const app = express()
// const cors = require("cors");

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// route
require('../src/router')(app);

module.exports = app
module.exports.handler = serverless(app)