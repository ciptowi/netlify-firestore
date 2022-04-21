const router = require('express').Router();
const { verifySignUp } = require("../middlewares");
const auth = require("../controllers/auth.controller");
const { authJwt } = require("../middlewares");
const user = require("../controllers/user.controller");

// auth router
router.post(
  "/api/auth/signup",
  [
    verifySignUp.checkDuplicateUsernameOrEmail,
    verifySignUp.checkRolesExisted
  ],
  auth.signup
);
router.post("/api/auth/signin", auth.signin);

// user router
router.get("/api/test/all", user.allAccess);
router.get("/api/test/user", [authJwt.verifyToken], user.userBoard);
router.get(
  "/api/test/mod",
  [authJwt.verifyToken, authJwt.isModerator],
  user.moderatorBoard
);
router.get(
  "/api/test/admin",
  [authJwt.verifyToken, authJwt.isAdmin],
  user.adminBoard
);

module.exports = router