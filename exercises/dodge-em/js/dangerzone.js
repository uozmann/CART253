"use strict";

function preload() {
}

// // The basic properties of our "sphere" (a circular gradient)
// let sphere = {
//   x: 250,
//   y: 250,
//   size: 300
// }
//
// function setup() {
//   createCanvas(500, 500);
//   noStroke();
// }
//
// function draw() {
//   background(0);
//   // Our loop continues while the next circle to drawn is larger than 0
//   for (let size = sphere.size; size > 0; size--) {
//     // Calculate our fill by mapping the current circle's size based on the overall size
//     let currentFill = map(size, 0, sphere.size, 255, 0);
//     // Apply the fill
//     fill(currentFill);
//     // Draw the ellipse
//     ellipse(sphere.x, sphere.y, size);
//   }
// }

// We need to know how many stars we want to draw in the sky
let numStars = 100;

function setup() {
  createCanvas(500, 500);
  // White stroke because we're using point() on black
  stroke(255);
}

function draw() {
  // Black sky
  background(0);
  // randomSeed() lets us make random() predictable: it will generate the same sequence of numbers
  // each time draw() is called
  randomSeed(0);
  // Our for loop counts from 0 to numStars
  for (let i = 0; i < numStars; i++) {
    // Choose a random x and y position on the canvas
    let x = random(0, width);
    let y = random(0, height);
    // Draw a point (star) there
    point(x, y);
  }
}
