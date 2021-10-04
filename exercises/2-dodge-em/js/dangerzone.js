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

// // Our circle object
// let circle = {
//   x: 250,
//   y: 250,
//   size: 50,
//   // Because it changes size, let's set a minimum and maximum size
//   minSize: 50,
//   maxSize: 400,
//   fill: 0,
//   // We need to keep track of whether the circle is being dragged or not
//   // so we know whether to move it with the mouse position
//   dragging: false
// }
//
// function setup() {
//   createCanvas(500, 500);
// }
//
// function draw() {
//   background(127);
//   fill(circle.fill);
//   ellipse(circle.x, circle.y, circle.size);
// }
//
// // mousePressed() is called at the moment the user presses down a mouse button
// function mousePressed() {
//   // Calculate the distance between the mouse position and the circle position
//   let d = dist(mouseX, mouseY, circle.x, circle.y);
//   // If the distance is less that the circle's radius, we know the mouse was
//   // inside the circle when pressed
//   if (d < circle.size / 2) {
//     // So we can now drag the circle
//     circle.dragging = true;
//   }
// }
//
// // mouseReleased() is called at the moment the user releases a mouse button
// function mouseReleased() {
//   // If the mouse is released, we should stop dragging the circle
//   circle.dragging = false;
// }
//
// // mouseDragged() is called every frame that the user is moving the mouse
// // with a button held down
// function mouseDragged() {
//   // When the mouse is dragged (with the mouse button down), we check if the circle
//   // is being dragged
//   if (circle.dragging) {
//     // If it is, we move it to the mouse position
//     circle.x = mouseX;
//     circle.y = mouseY;
//   }
// }
//
// // mouseWheel() is called every frame that the user is scrolling with the scroll wheel on
// // a mouse or using their touchpad
// function mouseWheel(event) {
//   // When the mouse wheel (or touchpad) is scrolled
//   // event.delta contains the distance (in pixels) it scrolled
//   // So we can add this to the size of the circle
//   circle.size += event.delta;
//   // And constrain the size to stay within the minimum and maximum
//   circle.size = constrain(circle.size, circle.minSize, circle.maxSize);
// }

// let backgroundShade = 0;
// let circle = {
//   x: 0,
//   y: 250,
//   size: 100,
//   vx: 0,
//   vy: 0 // We can start the two velocities at 0 because we move the circle with the mouse now
// }
//
// function setup() {
//   createCanvas(500,500);
// }
//
// function draw() {
//   background(backgroundShade);
//
//   // If the mouse x position is GREATER than the circle x position, it must be to the RIGHT of the circle
//   if (mouseX > circle.x) {
//     // So set the circle's x velocity to a POSITIVE number to move it to the RIGHT
//     circle.vx = 1;
//   }
//   // Or if the mouse x position is LESS than the circle x position, it must be to the LEFT of the circle
//   else if (mouseX < circle.x) {
//     // So set the circle's x velocity to a NEGATIVE number to move it to the LEFT
//     circle.vx = -1;
//   }
//
//   // If the mouse position is GREATER than the circle y position, it must be BELOW the circle
//   if (mouseY > circle.y) {
//     // So set the circle's x velocity to a POSITIVE number to move it DOWN
//     circle.vy = 1;
//   }
//   // Or if the mouse y position is LESS than the circle y position, it must be ABOVE the circle
//   else if (mouseY < circle.y) {
//     // So set the circle's x velocity to a NEGATIVE number to move it UP
//     circle.vy = -1;
//   }
//
//   // Then we actually APPLY these changes to `vx` and `vy` to the circle's position
//   circle.x = circle.x + circle.vx;
//   circle.y = circle.y + circle.vy;
//
//   // And draw the ellipse at its new position
//   ellipse(circle.x,circle.y,circle.size);
// }

// let backgroundShade = 0;
// let circle = {
//   x: 0,
//   y: 250,
//   size: 100,
//   vx: 0,
//   vy: 0,
//   ax: 0, // NEW: acceleration in x
//   ay: 0, // NEW: acceleration in y
//   maxSpeed: 2, // RENAMED: to reflect a maximum speed
//   acceleration: 0.05 // NEW: how much the circle can accelerate per frame
// }
//
// function setup() {
//   createCanvas(500, 500);
// }
//
// function draw() {
//   background(backgroundShade);
//
//   // If the mouse x position is GREATER than the circle x position, it must be to the RIGHT of the circle
//   if (mouseX > circle.x) {
//     // So set the circle's x acceleration to positive to start moving it right
//     circle.ax = circle.acceleration;
//   }
//   // Or if the mouse x position is LESS than the circle x position, it must be to the LEFT of the circle
//   else if (mouseX < circle.x) {
//     // So set the circle's x acceleration to negative to start it moving left
//     circle.ax = -circle.acceleration;
//   }
//
//   // If the mouse position is GREATER than the circle y position, it must be BELOW the circle
//   if (mouseY > circle.y) {
//     // So set the circle's y acceleration to positive start it moving down
//     circle.ay = circle.acceleration;
//   }
//   // Or if the mouse y position is LESS than the circle y position, it must be ABOVE the circle
//   else if (mouseY < circle.y) {
//     // So set the circle's y acceleration to negative start it moving up
//     circle.ay = -circle.acceleration;
//   }
//
//   // Update the circle's current velocity based on its acceleration!
//   // Note that we also want to CONSTRAIN the velocity to not exceed the maximum speed
//   circle.vx = circle.vx + circle.ax;
//   circle.vx = constrain(circle.vx, -circle.maxSpeed, circle.maxSpeed);
//
//   circle.vy = circle.vy + circle.ay;
//   circle.vy = constrain(circle.vy, -circle.maxSpeed, circle.maxSpeed);
//
//   // Then we actually APPLY these changes to `vx` and `vy` to the circle's position
//   circle.x = circle.x + circle.vx;
//   circle.y = circle.y + circle.vy;
//
//   // And draw the ellipse at its new position
//   ellipse(circle.x, circle.y, circle.size);
// }

// // Angles of rotation for our shape
// let angleX = 0;
// let angleY = 0;
//
// function setup() {
//   // Using WEBGL in createCanvas to specify 3D graphics
//   createCanvas(500, 500, WEBGL);
// }
//
// function draw() {
//   background(0);
//
//   // Our shape
//   push();
//   // Translate to the center (not really needed, but just for completeness)
//   translate(0, 0, 0);
//   // Rotate AROUND the x axis
//   rotateX(angleX);
//   // Rotate AROUND the y axis
//   rotateY(angleY);
//   // Looks nicer
//   noStroke();
//   // Our central cube is white
//   fill(255);
//   box(100);
//   // A red bar passing through the box
//   fill(255, 0, 0);
//   box(200, 25, 25);
//   // A green bar passing through the box
//   fill(0, 255, 0);
//   box(25, 200, 25);
//   // A blue bar passing through the box
//   fill(0, 0, 255);
//   box(25, 25, 200);
//   // Note how the entire shape rotates because the rotateX() and rotateY() are applied to everything
//   // afterwards until the pop() below here
//   pop();
//
//   // Increase the angles to rotate over time
//   angleX = angleX + 0.01;
//   angleY = angleY + 0.05;
// }
//
let covid19 = {
  x: 0,
  y: 250,
  size: 100,
  vx: 0,
  vy: 0,
  speed: 5,
  fill: {
    r: 255,
    g: 0,
    b: 0
  }
};

let user = {
  x: 250,
  y: 250,
  size: 100,
  fill: 255
};

let numStatic = 5000;

function setup() {
  createCanvas(windowWidth, windowHeight);

  covid19.y = random(0, height);
  covid19.vx = covid19.speed;

  noCursor();
}
//
// function draw() {
//   background(0);
//
//   // Display static
//   for (let i = 0; i < numStatic; i++) {
//     let x = random(0, width);
//     let y = random(0, height);
//     stroke(255);
//     point(x, y);
//   }
//
//   // Covid 19 movement
//   covid19.x = covid19.x + covid19.vx;
//   covid19.y = covid19.y + covid19.vy;
//
//   if (covid19.x > width) {
//     covid19.x = 0;
//     covid19.y = random(0, height);
//   }
//
//   // User movement
//   user.x = mouseX;
//   user.y = mouseY;
//
//   // Check for catching covid19
//   let d = dist(user.x, user.y, covid19.x, covid19.y);
//   if (d < covid19.size / 2 + user.size / 2) {
//     noLoop();
//   }
//
//   // Display covid 19
//   fill(covid19.fill.r, covid19.fill.g, covid19.fill.b);
//   ellipse(covid19.x, covid19.y, covid19.size);
//
//   // Display user
//   fill(user.fill);
//   ellipse(user.x, user.y, user.size);
// }

"use strict";

function preload() {
}

let backgroundShade = {
  r: 235,
  g: 220,
  b: 175
}
let circle = {
  x: 100,
  y: 100,
  size: 100,
  vx: 0,
  vy: 0,
  ax: 0,
  ay: 0,
  maxSpeed: 1,
  acceleration: 0,05,
  fill: 255
}
let dangerZone = {
  x: 0,
  y: 0,
  z: 0,
  size: 150
}

function setup() {
  createCanvas(800,800);
}

function draw() {
  background(0);
  ellipse(circle.x, circle.y, circle.size);
  // if (mouseX < circle.x) {
  //   circle.ax= circle.acceleration,
  // }

}
