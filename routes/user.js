const express = require("express");
const router = require("express-promise-router")();
const passport = require("passport");
const passportConf = require("../passport");

const { validateBody } = require("../helpers/routesHelper");
const UserController = require("../controller/user");

router.post("/signup", UserController.signUp, validateBody());

router.post("/signin", UserController.signIn);

router.get(
  "/secret",
  passport.authenticate("jwt", { session: false }),
  UserController.secret
);

module.exports = router;
