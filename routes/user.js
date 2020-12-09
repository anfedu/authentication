const express = require("express");
const router = require("express-promise-router")();

const UserController = require("../controller/user");

router.post("/signup", UserController.signUp);
router.post("/signin", UserController.signIn);
router.get("/secret", UserController.secret);

module.exports = router;
