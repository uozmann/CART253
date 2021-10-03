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

// // We need to know how many stars we want to draw in the sky
// let numStars = 100;
//
// function setup() {
//   createCanvas(500, 500);
//   // White stroke because we're using point() on black
//   stroke(255);
// }
//
// function draw() {
//   // Black sky
//   background(0);
//   // randomSeed() lets us make random() predictable: it will generate the same sequence of numbers
//   // each time draw() is called
//   randomSeed(0);
//   // Our for loop counts from 0 to numStars
//   for (let i = 0; i < numStars; i++) {
//     // Choose a random x and y position on the canvas
//     let x = random(0, width);
//     let y = random(0, height);
//     // Draw a point (star) there
//     point(x, y);
//   }
// }

// let lightIsOn = false;
//
// function setup() {
//   createCanvas(500, 500);
// }
//
// function draw() {
//   background(255);
//
//   // Draw a red ellipse you can only see when the light is on!
//
//
//   // If the light is off, draw a black rectangle on top of everything
//   // to hide it (make it "dark")
//   // Notice how we check if the light is NOT on by using ! in front of the variable
//   if (!lightIsOn) {
//     fill(0);
//     rect(0,0,width,height);
//   }
//
//   fill(255,0,0);
//   ellipse(250,250,100,100);
// }
//
// function mousePressed() {
//   // When the mouse button is pressed, flip the variable
//   lightIsOn = !lightIsOn;
//   // Notice how we can flip the true/false value by using the NOT operator !
//   // If lightIsOn is true, then ! will make it false
//   // If lightIsOn is false, then ! will make it true
// }

// Our circle object
let circle = {
  x: 250,
  y: 250,
  size: 50,
  // Because it changes size, let's set a minimum and maximum size
  minSize: 50,
  maxSize: 400,
  fill: 0,
  // We need to keep track of whether the circle is being dragged or not
  // so we know whether to move it with the mouse position
  dragging: false
}

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(127);
  fill(circle.fill);
  ellipse(circle.x, circle.y, circle.size);
}

// mousePressed() is called at the moment the user presses down a mouse button
function mousePressed() {
  // Calculate the distance between the mouse position and the circle position
  let d = dist(mouseX, mouseY, circle.x, circle.y);
  // If the distance is less that the circle's radius, we know the mouse was
  // inside the circle when pressed
  if (d < circle.size / 2) {
    // So we can now drag the circle
    circle.dragging = true;
  }
}

// mouseReleased() is called at the moment the user releases a mouse button
function mouseReleased() {
  // If the mouse is released, we should stop dragging the circle
  circle.dragging = false;
}

// mouseDragged() is called every frame that the user is moving the mouse
// with a button held down
function mouseDragged() {
  // When the mouse is dragged (with the mouse button down), we check if the circle
  // is being dragged
  if (circle.dragging) {
    // If it is, we move it to the mouse position
    circle.x = mouseX;
    circle.y = mouseY;
  }
}

// mouseWheel() is called every frame that the user is scrolling with the scroll wheel on
// a mouse or using their touchpad
function mouseWheel(event) {
  // When the mouse wheel (or touchpad) is scrolled
  // event.delta contains the distance (in pixels) it scrolled
  // So we can add this to the size of the circle
  circle.size += event.delta;
  // And constrain the size to stay within the minimum and maximum
  circle.size = constrain(circle.size, circle.minSize, circle.maxSize);
}
