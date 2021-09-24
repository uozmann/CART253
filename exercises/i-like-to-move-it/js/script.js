/**
Exercise1: I like to move it
Man Zou

Include three shapes: arc, triangle, rectancle and ellipse.
Include movement: arc moving on x axis.
Include size changes: arc changing its size.
Include color changes: paintbrush changes colour according to position and affects the arc.
Use map() and constrain(): line 81, 82, 91, 93, 95.
Respond to the mouse position using mouseX and mouseY: the ellipse.
*/

"use strict";


/**
Description of preload
*/
function preload() {

}


let backgroundShade = 0;

let paintCanvas = {
  x: 0,
  y: 500,
  fill: 200,
  width: 1800,
  height: 500,
}

// Paintbrush and colour-picker object
let circle = {
  x: 0,
  y: 250,
  size: 200,
  speed: 1,
  fill:0
};

// Canvas indication
let indication = {
  x1: 200,
  y1: 750,
  x2: 150,
  y2: 650,
  x3: 250,
  y3: 650,
  size: 100,
  speed: 0.5,
  fill: 0
}

// Animated half-circle object
let moon = {
  x: 1500,
  y: 250,
  size: 400,
  speed: 1,
  fill: 255,
  angle: 1
}


function setup() {
  createCanvas(1800, 1000);
  background(backgroundShade);

  fill(paintCanvas.fill);
  rect(paintCanvas.x, paintCanvas.y, paintCanvas.width, paintCanvas.height);
}


function draw() {
// Paintbrush colour variation settings
  let randomNumber=random(0, 5);
  let greenMouse = map(mouseX, 0, width, 0, 255);
  let blueMouse = map(mouseY, 0, width, 0, 255);
  fill(200, greenMouse, blueMouse);
  noStroke();
  circle.x = mouseX;
  circle.y = mouseY;
  ellipse(circle.x, circle.y, circle.size);

// Animated half-circle object settings
  moon.x += -1;
  moon.x = constrain(moon.x, 200, 1800);
  moon.x += -1;
  moon.x = constrain(moon.x, 200, 1800);
  moon.size += -1;
  moon.size = constrain(moon.size, -400, 400);
  arc(moon.x, moon.y, moon.size, moon.size, PI + HALF_PI, HALF_PI);

// Indication for painting area
  triangle(indication.x1, indication.y1, indication.x2, indication.y2, indication.x3, indication.y3);
}
