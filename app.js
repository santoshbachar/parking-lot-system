var park = require("./parking");
park.initParking(2, 1, 1, 5);

var terminal = require("./terminal");
// app.use()
if (terminal.console() === true) {
  return;
} else {
  console.log("Its not a terminal thing. Starting up the servers...");
}

var express = require("express");
var bodyParser = require("body-parser");
const cors = require("cors");

var add = require("./routes/add");
var misc = require("./routes/misc");

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// add vehicle
app.use("/add", add);
app.use("/", misc);

const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log("app is listening at port " + port);
});
