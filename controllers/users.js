const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const users = require("../models/users");
const buses = require("../models/buses");
const bus_booking = require("../models/bus_booking");
//const Request = require("../../models/Request");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const normalize = require("normalize-url");
//const auth = require("../middleware/auth");

const post2 = async (req, res) => {
  const { name, email, category, password } = req.body;
  try {
    console.log(email);
    let user = await users.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ errors: [{ msg: "User already exists2" }] });
    }

    user = new users({
      name,
      email,
      category,
      password,
    });

    //encrypt password
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    //return jsonwebtoken
    const payload = {
      user: {
        id: user.id,
      },
    };
    console.log(payload);
    console.log("BYE");
    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: "5 days" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.log("Error in users.js");
    res.status(500).send("Server Error");
  }
};
const addbus = async (req, res) => {
  const { bus_id, from, to, start_time, end_time, date } = req.body;
  try {
    bus = new buses({
      bus_id,
      from,
      to,
      start_time,
      end_time,
      date,
    });
    await bus.save();
    console.log("done bus register");
  } catch (err) {
    console.log("Error in buses.js");
    res.status(500).send("Server Error");
  }
};
const viewbuses = async (req, res) => {
  const { from, to, date } = req.body;
  try {
    let bus = await buses.find({ from: "from", to: "to", date: "date" });
    res.send(bus);
  } catch (err) {
    console.log("Error in viewbuses.js");
    res.status(500).send("Server Error");
  }
};
const viewbuses_a = async (req, res) => {
  const { date } = req.body;
  try {
    let bus = await buses.find({ date: "date" });
    res.send(bus);
  } catch (err) {
    console.log("Error in viewbuses_a.js");
    res.status(500).send("Server Error");
  }
};
const viewbus = async (req, res) => {
  const { bus_id, start_time, end_time, from, to } = req.body;
  try {
    let bus = await buses.findOne({
      bus_id: "bus_id",
      from: "from",
      to: "to",
      start_time: "start_time",
      end_time: "end_time",
    });
    res.send(bus);
  } catch (err) {
    console.log("Error in viewbus route");
    res.status(500).send("Server Error");
  }
};
// const reset = async (req, res) => {
//     const { bus_id, start_time, end_time,from,to } = req.body;
// //open up all the tickets

// }
// const bookbus = async (req, res) => {
//   const {bus_id,seat_number} = req.body;
//   user_id:req.user.id;
//   try {
//     bus_book = new bus_booking({
//    bus_id,user_id,seat_number
//     });
//     await bus_booking.save();
//   } catch (err) {
//     console.log("Error in viewbuses.js");
//     res.status(500).send("Server Error");
//   }
// };

module.exports = { post2, addbus, viewbuses, viewbuses_a, viewbus };
