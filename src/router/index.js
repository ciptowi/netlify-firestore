const router = require("express").Router();
const firestore = require('../controllers/firestore.controller');

module.exports = app => {
  // Player Endpoints
  router.post("/create/person", firestore.createPerson);
  router.get("/all/persons", firestore.getAllPersons);
  router.get("/person/:id", firestore.getPersonByID);
  router.put("/update/person/:id", firestore.updatePersonById);
  router.delete("/delete/person/:id", firestore.deletePersonById);

  // API prefix
  app.use("/api", router);
};
