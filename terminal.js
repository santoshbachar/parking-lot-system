const http = require("http");
var options = {
  hostname: "http://localhost/",
  port: 3000,
  path: "/",
  method: "GET",
};

var park = require("./parking");

exports.console = function () {
  var myArgs = process.argv.slice(2);
  if (myArgs.length) {
    console.log("myArgs: " + myArgs + " myArgs.length " + myArgs.length);
    switch (myArgs[0]) {
      case "status":
        console.log(park.countVehicles());
        /*options.path = "/status";
        http.request(options, (res) => {
          console.log(res);
        });*/
        break;
      case "add":
        // because we need 3 args
        if (myArgs.length < 2) {
          console.log("Undefined vehicle. Trying adding add <bike, car, bus>");
          break;
        }
        let argVehicle = myArgs[1];
        switch (argVehicle) {
          case "bike":
            park.addBike(null, 1);
            /*options.path = "/add/bike/" + new Date().getTime();
            http.request(options, (res) => {
              console.log(res);
            });*/
            break;
          case "car":
            park.addCar(null, 1);
            break;
          case "bus":
            park.addBus(null, 1);
            break;
            default:
              console.log("Invalid vehicle type. Use bike, car or bus.");
        }
        break;
      case "find":
        if (myArgs.length < 2) {
          console.log(
            "Undefined registration id. A valid registration id is any string"
          );
          break;
        }
        // console.log(park.findVehicle(myArgs[1]));
        options.path = "/find/" + myArgs[1];
        const req = http.request(options, (res) => {
          console.log(res);
        });
        break;
    }
  }
  if (myArgs.length) {
    return true;
  }
};
