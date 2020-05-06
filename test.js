var park = require("../parking");

function tBike() {
  for (let i = 0; i < 500; i++) {
    park.addBike(i, i);
  }
}

function tCar() {
  for (let i = 0; i < 500; i++) {
    park.addCar(i, i);
  }
}

function tBus() {
  for (let i = 0; i < 500; i++) {
    park.addBus(i, i);
  }
}

function test() {
  park.findVehicle("123");

  tBike();
  tBus();
  tCar();

  findData = park.findVehicle("1");
  console.log("printing return data of findData");
  console.log(findData);
}
