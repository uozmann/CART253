// Exercise1: Dodge-em
// Man Zou
// Change the way the user controls their circle:
// Add at least one new if-statement:
// Change the way the simulation looks:
// Use at least one image:

"use strict";

let img;
function preload() {
img = loadImage('2-dodge-em/assets/images/mascot.png');
}

let backgroundShade = {
  r: 230,
  g: 215,
  b: 175
}

// Moving circle
let character = {
  x: 100,
  y: 250,
  size: 75,
  vx: 0,
  vy: 0,
  speed: 1,
  fill:0
};

// Canvas indication
let indication = {
  x: undefined,
  y: undefined,
  width: 10,
  height: 10,
  segments: 50,
  fill: 0
}

// Animated half-circle object

let controlOptions = {
  top: false,
  down: false,
  right: false,
  left: false,
  showLine: false
}

function setup() {
  createCanvas(1000, 800);

}


function draw() {
  background(backgroundShade.r, backgroundShade.g, backgroundShade.b);
  fill(indication.fill);
  image(img, 0, 0);

  push();
  if (controlOptions.left) {
    character.x += 1;
  }
  else if (!controlOptions.left) {
    character.x += 0;
  }
  if (controlOptions.right) {
    character.x += -1;
  }
  else if (!controlOptions.right) {
    character.x += 0;
  }
  if (controlOptions.top) {
    character.y += 1;
  }
  else if (!controlOptions.top) {
    character.y += 0;
  }
  if (controlOptions.down) {
    character.y += -1;
  }
  else if (!controlOptions.top) {
    character.y += 0;
  }
  ellipse(character.x, character.y, character.size);
  pop();

  push();
  if (controlOptions.showLine) {
    stroke(0);
  }
  else if (!controlOptions.showLine) {
    noStroke();
  }
  line(character.x, character.y, indication.x, indication.y);
  pop();

  push();
  randomSeed(0);
  for (let i = 0; i < indication.segments; i++) {
    indication.x = random(0, width);
    indication.y = random(0, height);
    rect(indication.x, indication.y, indication.width, indication.height);
  }
  let d = dist(indication.x, indication.y, character.x, character.y);
  if (d < character.size / 2 ) {
    noLoop();
  }
  pop();

}

function keyPressed() {
  if (key === 'a') {
    controlOptions.right = true;
  }
  else {
    controlOptions.left = false;
    controlOptions.right = false;
    controlOptions.top = false;
    controlOptions.down = false;
  }
  if (key === 'd') {
    controlOptions.left = true;
  }
  if (key === 'w') {
    controlOptions.down = true;
  }
  if (key === 's') {
    controlOptions.top = true;
  }
  if (key === 'q') {
    loop();
    character.x = 100;
    character.y = 250;
  }
  if (key === 'z') {
    controlOptions.showLine = true;
  }
}
