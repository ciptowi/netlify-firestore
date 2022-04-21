"use strict"
const express = require('express');
const serverless = require('serverless-http');
const cors = require("cors");
const app = express()
const swaggerUI = require("swagger-ui-express");
const swaggerJSON = require("../src/swagger.json");
const path = require('path');

app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerJSON));

var corsOptions = {
  origin: "*"
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// const router = express.Router()
// simple route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/index.html'));
  // res.json({ message: "Welcome to Auth API, please visit the '/api/docs' endpoint to see the full documentation" });
})

const db = require("../src/app/models");
const Role = db.role;
const pass = encodeURIComponent("C9w!sRkKZB:W!UH")
const doc = "authMongo"
db.mongoose
  .connect(`mongodb+srv://cipto:${pass}@cluster0.dwfw4.mongodb.net/${doc}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'user' to roles collection");
      });
      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'moderator' to roles collection");
      });
      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'admin' to roles collection");
      });
    }
  });
}

// app.use('/', router)
require('../src/app/routes/auth.routes')(app);
require('../src/app/routes/user.routes')(app);

module.exports = app
module.exports.handler = serverless(app)