// Exercise1: Dodge-em
// Man Zou
// Change the way the user controls their circle: arc, triangle, rectancle and ellipse.
// Add at least one new if-statement: arc moving on x axis.
// Change the way the simulation looks: arc changing its size.
// Use at least one image: paintbrush changes colour according to position and affects the arc.

"use strict";

function preload() {
}

let backgroundShade = 0;
let circle = {
  x: undefined,
  y: undefined,
  size: 100,
  speed: 1,
  fill: 255
}
let dangerZone = {
  x: 250,
  y: 250,
  size: 150
}
let displayCircle = false;
let caterpillar = {
  x: 100,
  y: 250,
  totalSegments: 50, // NEW: Need to know how many segments it has!
  segmentSize: 5,
  segmentSpacing: 4, // NEW: better to have this as a property of the caterpillar
}

function setup() {
  createCanvas(500,500);
  circle.x = random (0, width);
  circle.y = random (0, height);
}

function draw() {
  background(backgroundShade);
  backgroundShade+= 0.5;
  if(backgroundShade===255){
    backgroundShade= 0;
  }

  fill(circle.fill);
  if (mouseIsPressed === true) {
    // This happens when EITHER of the two conditions are true
    fill(255,0,0);
    displayCircle = true;
  }
  else if (keyIsPressed === true) {
  fill(0,255,0);
}
  else {
  fill(0,0,255);
}
if(displayCircle) {
    ellipse(circle.x,circle.y,circle.size);
}

noFill();
  stroke(255, 0, 0);
  ellipse(dangerZone.x, dangerZone.y, dangerZone.size);
  let d = dist(circle.x, circle.y, dangerZone.x, dangerZone.y);
// Check if our white circle overlaps the danger zone...
while (d < circle.size / 2 + dangerZone.size / 2) {
  // If it does, try a different random position!
  circle.x = random(0, width);
  circle.y = random(0, height);
  // Recalculate the distance for the next time through the loop
  d = dist(circle.x, circle.y, dangerZone.x, dangerZone.y);
}

let x = caterpillar.x;
let segmentsDrawn = 0;
// while (segmentsDrawn < caterpillar.totalSegments) {
//   ellipse(x, caterpillar.y, caterpillar.segmentSize);
//   x = x + caterpillar.segmentSpacing;
//   segmentsDrawn = segmentsDrawn + 1;
// }
for (let segmentsDrawn = 0; segmentsDrawn < caterpillar.totalSegments; segmentsDrawn++) {
  ellipse(x, caterpillar.y, caterpillar.segmentSize);
  x = x + caterpillar.segmentSpacing;
}

}
