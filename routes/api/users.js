const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const User = require("../../models/users");
//const Request = require("../../models/Request");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const normalize = require("normalize-url");
const auth = require("../../middleware/auth");
const mod = require("../../controllers/users.js");
//register
router.post("/", (req, res) => {
  mod.post2(req, res);
});
//add bus for the admin
router.post("/addbus", (req, res) => {
  mod.addbus(req, res);
});
//view buses for the customer
router.get("/viewbuses", (req, res) => {
  mod.viewbuses(req, res);
});
//for customer
router.post("/bookbus", (req, res) => {
  mod.bookbus(req, res);
});
//for customer
router.post("/viewbus", (req, res) => {
  mod.viewbus(req, res);
});
//for admin
router.post("/viewbuses_a", (req, res) => {
  mod.viewbuses_a(req, res);
});
//for admin reset
router.post("/reset", (req, res) => {
  mod.reset(req, res);
});
module.exports = router;
