var express = require("express");
var router = express.Router();

var park = require("../parking");

router.get("/", function (req, res) {
  res.send("Hello world ! \n Welcome to Parking-lot System");
});

// This could also have been done in router.get
router.post("/init", function (req, res) {
  const data = req.body;
  park.initParking(data.rows, data.single, data.compact, data.large);
  res.send(`{ok: "Parking initialized successfully"}`);
});

router.get("/status", function (req, res) {
  console.log(park.parking);
  var summary = park.countVehicles();
  // var summaryText = `🏍 = ${summary.bike} 🚗 = ${summary.car}  🚌 = ${summary.bus}`;
  /*res.send(
    `<h5>Summary => </h5>
      ${summaryText}
      <h5>Full Report => </h5>
      ${JSON.stringify(park.parking)}`
  );*/
  res.send(summary);
});

router.get("/find/:id", function (req, res) {
  const id = req.params.id;
  let msg = park.findVehicle(id);
  console.log(msg);
  res.send(msg);
});

module.exports = router;
