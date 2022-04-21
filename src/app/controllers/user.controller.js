const db = require("../models");
const User = db.user;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};
exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};
exports.adminBoard = (req, res) => {
  User.find().then((user) => {
    res.status(200).json({
      message: "Board for Admin",
      data: user
    });
  })
};
exports.moderatorBoard = (req, res) => {
  User.find().then((user) => {
    res.status(200).json({
      message: "Board for Moderator",
      data: user
    });
  })
};