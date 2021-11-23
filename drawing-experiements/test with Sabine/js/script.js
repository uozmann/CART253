"use strict";

// Our vehicles
let vehicles = [];
// How many of each kind
let numCars = 5;
let numMotorcycles = 10;
let numSportsCars = 5;

// Set up the canvas and our vehicles
function setup() {
  createCanvas(600, 600);
  // Create the correct number of cars and put them in our vehicles array
  for (let i = 0; i < numCars; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let car = new Car(x, y);
    vehicles.push(car);
  }

  for (let i = 0; i < numSportsCars; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let sportscar = new SportsCar(x, y);
    vehicles.push(sportscar);
  }

  // Create the correct number of motorcycles and put them in our vehicles array
  for (let i = 0; i < numMotorcycles; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let motorcycle = new Motorcycle(x, y);
    vehicles.push(motorcycle);
  }
}

// Display and move the cars
function draw() {
  background(0);

  // Go through all the vehicles (both cars and motorcycles)
  // and move, wrap, and display them. We can do this because we know
  // that all vehicles have those methods!
  for (let i = 0; i < vehicles.length; i++) {
    let vehicle = vehicles[i];
    vehicle.move();
    vehicle.wrap();
    vehicle.display();
  }
}