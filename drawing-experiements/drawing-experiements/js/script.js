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
  size: 100,
  speed: 1
};

function setup() {
  createCanvas(500,500);
}

function draw() {
  background(backgroundShade);
  ellipse(circlex,circle.y,circle.size);
  circle.x = circle.x + circle.speed;
}

Questions: why doesnt ex. width/2 works when defining a variable? Whats the relationship between html dev elements and rect elements in p5?
