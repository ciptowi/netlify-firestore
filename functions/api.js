const express = require('express');
const serverless = require('serverless-http');
const app = express()
// const cors = require("cors");

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// route
require('../src/router')(app);

module.exports = app
module.exports.handler = serverless(app)
