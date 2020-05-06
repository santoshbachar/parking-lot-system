var express = require("express");
var router = express.Router();

var park = require("../parking");

function resHandler(res, status, msg, output) {
  res.send({
    status: status,
    msg: msg,
    output: output,
  });
}

router.get("/bike/:id", function (req, res) {
  const id = req.params.id;
  console.log("addbike id " + id);
  // console.log("hello" + req.query);
  ok = park.addBike(id, 1);
  if (ok === true) {
    console.log(park.parking);
    // res.send("🏍 added");
    resHandler(res, true, null, park.parking);
  } else {
    console.log("Cannot add any new 🏍");
    resHandler(res, false, "Cannot add any new 🏍", null);
  }
});

router.get("/car/:id", function (req, res) {
  const id = req.params.id;
  ok = park.addCar(id, 1);
  if (ok === true) {
    console.log(park.parking);
    // res.send("🚗 added");
    resHandler(res, true, null, park.parking);
  } else {
    console.log("Cannot add any new 🚗");
    resHandler(res, false, "Cannot add any new 🚗", null);
  }
});

router.get("/bus/:id", function (req, res) {
  const id = req.params.id;
  ok = park.addBus(id, 1);
  if (ok === true) {
    console.log(park.parking);
    // res.send("🚌 added");
    resHandler(res, true, null, park.parking);
  } else {
    console.log("Cannot add any new 🚌");
    resHandler(res, false, "Cannot add any new 🚌", null);
  }
});

module.exports = router;
