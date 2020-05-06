# PARKING LOT SYSTEM (Backend)

The whole idea of this system is stored and manipulated to or from the parking[] variable.

The initial state of the parking[] is null.

It first must be initialized to be able to store and mainpulate the vehicles.

And this is done by the node at the very begining of the app.js before it starts up the server and listens on port 3000 or Heroku provided port.

## CONSTRAINTS / RULES

1. Parking lot has multiple levels/storeys

This is achieved by the [] very nature of the array.

2. Each levels has 3 sections.

Here parkingConstants {} comes into play and defines 3 sections/spots as given in the assignment.

3. Vehicle parking rules localParkingConstants in the initParking() which itself uses the vehicleModel{} and vehicleBand{} objects to follow the rules.

Overview ==> Parking lot has multiple levels, each levels has multiple spots and each spots has all the bands of vehicles present in the system. Weather or not a vehicle is permitted or feasible to park is governed by the system.

For example: Single spot is only for bikes, but it has spaces for cars and buses (in memory data structure). Ofcourse, the program won't allow cars or buses to park there. The program simulation verifies the same.


## PROGRAM OUTLINE

1. app.js -> Initializes the express and related packages along with the parking system.

2. routes/add -> Deals with the incoming routes for adding the vehicles.

3. routes/misc -> handles routes to initParking, status and find functions.

4. parking.js -> the main brain or core of the system.

5. terminal.js -> intecepts the terminal commands executes it using parking api.

6. test.js -> not a true testing file, but more like a function factory. good for a quick random simulation.