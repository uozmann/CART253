// Exercise1: Dodge-em
// Man Zou
// Change the way the user controls their circle:
// Add at least one new if-statement:
// Change the way the simulation looks:
// Use at least one image:

"use strict";

function preload() {
}

let backgroundShade = {
  r: 235,
  g: 220,
  b: 175
};
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
};
let dangerZone = {
  x: 0,
  y: 0,
  z: 0,
  size: 150
};

function setup() {
  createCanvas(800,800);
}

function draw() {
  background(backgroundShade.r, backgroundShade.g, backgroundShade.b);
  ellipse(circle.x, circle.y, circle.size);
  // if (mouseX < circle.x) {
  //   circle.ax= circle.acceleration,
  // }

}
// let displayCircle = false;
// let caterpillar = {
//   x: 100,
//   y: 250,
//   totalSegments: 50, // NEW: Need to know how many segments it has!
//   segmentSize: 5,
//   segmentSpacing: 4, // NEW: better to have this as a property of the caterpillar
// }
//
// function setup() {
//   createCanvas(windowWidth,windowHeight,WEBGL);
//   circle.x = random (0, width);
//   circle.y = random (0, height);
// }
//
// function draw() {
//   background(backgroundShade);
//   backgroundShade+= 0.5;
//   if(backgroundShade===255){
//     backgroundShade= 0;
//   }
//
//   fill(circle.fill);
//   if (mouseIsPressed === true) {
//     // This happens when EITHER of the two conditions are true
//     fill(255,0,0);
//     displayCircle = true;
//   }
//   else if (keyIsPressed === true) {
//   fill(0,255,0);
// }
//   else {
//   fill(0,0,255);
// }
// if(displayCircle) {
//     ellipse(circle.x,circle.y,circle.size);
// }
//
// noFill();
//   stroke(255, 0, 0);
//   ellipse(dangerZone.x, dangerZone.y, dangerZone.size);
//   let d = dist(circle.x, circle.y, dangerZone.x, dangerZone.y);
// // Check if our white circle overlaps the danger zone...
// while (d < circle.size / 2 + dangerZone.size / 2) {
//   // If it does, try a different random position!
//   circle.x = random(0, width);
//   circle.y = random(0, height);
//   // Recalculate the distance for the next time through the loop
//   d = dist(circle.x, circle.y, dangerZone.x, dangerZone.y);
// }
//
// let x = caterpillar.x;
// let segmentsDrawn = 0;
// // while (segmentsDrawn < caterpillar.totalSegments) {
// //   ellipse(x, caterpillar.y, caterpillar.segmentSize);
// //   x = x + caterpillar.segmentSpacing;
// //   segmentsDrawn = segmentsDrawn + 1;
// // }
// for (let segmentsDrawn = 0; segmentsDrawn < caterpillar.totalSegments; segmentsDrawn++) {
//   ellipse(x, caterpillar.y, caterpillar.segmentSize);
//   x = x + caterpillar.segmentSpacing;
// }
//
// }
