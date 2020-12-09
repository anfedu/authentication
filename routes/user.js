const express = require("express");
const router = require("express-promise-router")();

const { validateBody } = require("../helpers/routesHelper");
const UserController = require("../controller/user");

router.post("/signup", UserController.signUp, validateBody());
router.post("/signin", UserController.signIn);
router.post("/secret", UserController.secret);

module.exports = router;
