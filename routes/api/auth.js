const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
const config = require("config");
const mod = require("../../controllers/auth.js");

const User = require("../../models/users");

//get user by token
router.get("/", auth, (req, res) => {
  mod.basic(req, res);
});

// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public
router.post("/", (req, res) => {
  console.log("hiii");
  mod.authenticate(req, res);
});

module.exports = router;
