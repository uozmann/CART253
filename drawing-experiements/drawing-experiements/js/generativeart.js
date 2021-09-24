/**
Drawing Practice
Man

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";


/**
Description of preload
*/
function preload() {

}

let backgroundShade = 0;
let circle = {
  x: 0,
  y: 250,
  size: 200,
  speed: 1,
  fill:0
};

function setup() {
  createCanvas(1200,500);
  background(backgroundShade);
}

// function draw() {
//
//   let randomNumber=random(0,5);
//   let redMouse = random(0,255);
//   let greenMouse = map(mouseX,0,width,0,255);
//   let blueMouse = map(mouseY,0,width,0,255);
//
//   ellipse(circle.x,circle.y,circle.size);
//
//   circle.x = mouseX;
//   circle.y = mouseY;
//   fill(redMouse,greenMouse,blueMouse);
//   noStroke();
// }

function draw() {

  let randomNumber=random(0,5);
  let greenMouse = map(mouseX,0,width,0,255);
  let blueMouse = map(mouseY,0,width,0,255);

  ellipse(circle.x,circle.y,circle.size);

  circle.x = mouseX;
  circle.y = mouseY;
  fill(190,greenMouse,blueMouse);
  noStroke();
}
