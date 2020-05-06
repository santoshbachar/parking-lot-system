var VehicleModel = {
  registrationNo: "",
  index: "",
};

function addVehicle(type, r, i) {
  // vehicle = JSON.parse(JSON.stringify(VehicleModel));
  vehicle = {
    type: type,
    registrationNo: r,
    index: i,
  };

  return vehicle;
}

// This is just for following the rules of parking and caluculation
var parkingConstants = {
  singleSpot: 0,
  compactSpot: 0,
  largeSpot: 0,
};

// The entire parking lot system is stored in this variable
var parking = [];

function initParking(rows, single, compact, large) {
  parkingConstants.singleSpot = single;
  parkingConstants.compactSpot = compact;
  parkingConstants.largeSpot = large;

  var vehicleBand = {
    bike: [],
    car: [],
    bus: [],
  };

  //console.log(vehicleBand);

  var localparkingConstants = {
    singleSpot: vehicleBand,
    compactSpot: vehicleBand,
    largeSpot: vehicleBand,
  };
  // For resetting the parking
  console.log("parking before init" + JSON.stringify(parking));
  parking.length = 0;
  for (i = 0; i < rows; i++) {
    parking.push(JSON.parse(JSON.stringify(localparkingConstants)));
  }
  console.log("parking after init" + JSON.stringify(parking));
}

function checkSpace(row, spot, num) {
  console.log(
    "checkSpace() row = " + row + " spot = " + spot + " num = " + num
  );

  totalBike = row[spot].bike.length;
  totalCar = row[spot].car.length;
  totalBus = row[spot].bus.length * 5;

  console.log("bike.length = " + totalBike);
  console.log("car.length = " + totalCar);
  console.log("bus.length = " + totalBus);

  totalVehicle = 0;

  /*switch (spot) {
    case "singleSpot":
      totalVehicle = totalBike;
      break;

    case "compactSpot":
      totalVehicle = totalCar + totalBus;
      break;

    case "largeSpot":
      totalVehicle = totalBike + totalCar + totalBus;
      break;
  }*/

  totalVehicle = totalBike + totalCar + totalBus;

  console.log("totalVehiclePresent = " + totalVehicle);

  console.log("parkingConstant for spot is " + parkingConstants[spot]);

  freeSpace = parkingConstants[spot] - totalVehicle;
  console.log("freeSpace = " + freeSpace);

  if (num <= freeSpace) {
    return true;
  }

  console.log("checkSpace result => false");

  return false;
}

function addBike(r, i) {
  // this thing is only specific for terminal cmd
  if (r === "" || r === undefined) {
    r = new Date().getTime();
  }
  console.log("r = " + r);
  bike = addVehicle("bike", r, i);

  // parking[0].singleSpot.bike.push(bike);

  for (i = 0; i < parking.length; i++) {
    row = parking[i];

    result = checkSpace(row, "singleSpot", 1);
    if (result === true) {
      row.singleSpot.bike.push(bike);
      return true;
    }

    result = checkSpace(row, "compactSpot", 1);
    if (result === true) {
      row.compactSpot.bike.push(bike);
      return true;
    }

    result = checkSpace(row, "largeSpot", 1);
    if (result === true) {
      row.largeSpot.bike.push(bike);
      return true;
    }
    /*console.log(
      "no space found for 🏍 in row " + (i + 1) + "moving for next row."
    );*/
  }

  return false;
}

function addCar(r, i) {
  car = addVehicle("car", r, i);

  // parking[0].singleSpot.bike.push(bike);

  for (i = 0; i < parking.length; i++) {
    row = parking[i];

    result = checkSpace(row, "compactSpot", 1);
    if (result === true) {
      row.compactSpot.car.push(car);
      return true;
    }

    result = checkSpace(row, "largeSpot", 1);
    if (result === true) {
      row.largeSpot.car.push(car);
      return true;
    }

    /*console.log(
      "no space found for 🚗 in row " + (i + 1) + "moving for next row."
    );*/
  }

  return false;
}

function addBus(r, i) {
  bus = addVehicle("bus", r, i);

  // parking[0].singleSpot.bike.push(bike);

  for (i = 0; i < parking.length; i++) {
    row = parking[i];

    result = checkSpace(row, "largeSpot", 5);
    if (result === true) {
      console.log("result is true for 🚌 no " + i);
      row.largeSpot.bus.push(bus);
      return true;
    }
    /*console.log(
      "no space found for 🚌 in row " + (i + 1) + "moving for next row."
    );*/
  }

  return false;
}

function countVehicles() {
  var bike = 0;
  var car = 0;
  var bus = 0;

  parking.forEach(function (row) {
    bike +=
      row.singleSpot.bike.length +
      row.compactSpot.bike.length +
      row.largeSpot.bike.length;

    car += row.compactSpot.car.length + row.largeSpot.car.length;

    bus += row.largeSpot.bus.length;
  });

  return {
    bike: bike,
    car: car,
    bus: bus,
  };
}

function _findVehicleHelper(vehicleBand, regNo) {
  // console.log(JSON.stringify(vehicleBand));
  // return JSON.stringify(vehicleBand);
  // console.log("reached _find");
  let bikeArray = vehicleBand.bike;
  for (let i = 0; i < bikeArray.length; i++) {
    let vehicle = bikeArray[i];
    // console.log("scanning " + JSON.stringify(vehicle));
    if (vehicle.registrationNo === regNo) {
      // console.log(vehicle);
      return vehicle;
    }
  }

  // loop through the car strip
  let carArray = vehicleBand.car;
  for (let i = 0; i < carArray.length; i++) {
    let vehicle = carArray[i];
    if (vehicle.registrationNo === regNo) {
      // console.log(vehicle);
      return vehicle;
    }
  }

  // loop through the bus strip
  let busArray = vehicleBand.bus;
  for (let i = 0; i < busArray.length; i++) {
    let vehicle = busArray[i];
    if (vehicle.registrationNo === regNo) {
      // console.log(vehicle);
      return vehicle;
    }
  }

  return false;
}

function findVehicle(regNo) {
  if (regNo === "" || regNo === undefined) {
    console.log("Invalid registration no.");
    return;
  }

  let result = false;

  for (let i = 0; i < parking.length; i++) {
    let row = parking[i];

    result = _findVehicleHelper(row.singleSpot, regNo);
    if (result) {
      return {
        output: result,
        row: i,
        spot: "Single Spot",
      };
    }

    result = _findVehicleHelper(row.compactSpot, regNo);
    if (result) {
      return {
        output: result,
        row: i,
        spot: "Compact Spot",
      };
    }

    result = _findVehicleHelper(row.largeSpot, regNo);
    if (result) {
      return {
        output: result,
        row: i,
        spot: "Large Spot",
      };
    }
  }

  console.log("going to return false from end");
  return false;
}

exports.parking = parking;
exports.initParking = initParking;
exports.addBike = addBike;
exports.addCar = addCar;
exports.addBus = addBus;
exports.countVehicles = countVehicles;
exports.findVehicle = findVehicle;
