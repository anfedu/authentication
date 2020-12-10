const express = require("express");
const router = require("express-promise-router")();
const passport = require("passport");
const passportConf = require("../passport");

const UserController = require("../controller/user");

router.post("/signup", UserController.signUp);

router.post("/signin", UserController.signIn);

router.get(
  "/secret",
  passport.authenticate("jwt", { session: false }),
  UserController.secret
);

router.delete("/delete/:id", UserController.deleteUser);

module.exports = router;
