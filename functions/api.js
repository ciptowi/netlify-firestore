"use strict"
const express = require('express');
const serverless = require('serverless-http');
const app = express()

const router = express.Router()

router.get('/', (req, res) => {
  res.json({
    result: "success",
    message: "welcome to deploying node js"
  })
})

app.use('/.netlify/functions/api/', router)

module.exports = app
module.exports.handler = serverless(app)