// Exercise1: Dodge-em
// Man Zou
// Change the way the user controls their circle: keyboard controls
// Add at least one new if-statement: in function draw
// Change the way the simulation looks: changed colours, elements, and shapes

"use strict";
let img;

function preload() {
  img = loadImage('assets/images/mascot.png');
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

// Points indication
let indication = {
  x: undefined,
  y: undefined,
  width: 10,
  height: 10,
  segments: 50,
  fill: 0
}

// Keyboard Commands
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

  // The moving circle and settings to make it move according to keyboard commands
  push();
  if (controlOptions.left) {
    character.x += 3;
  }
  else if (!controlOptions.left) {
    character.x += 0;
  }
  if (controlOptions.right) {
    character.x += -3;
  }
  else if (!controlOptions.right) {
    character.x += 0;
  }
  if (controlOptions.top) {
    character.y += 3;
  }
  else if (!controlOptions.top) {
    character.y += 0;
  }
  if (controlOptions.down) {
    character.y += -3;
  }
  else if (!controlOptions.top) {
    character.y += 0;
  }
  ellipse(character.x, character.y, character.size);
  image(img, character.x-36, character.y-35, character.size, character.size);
  pop();

  // Control options for drawing a line to the true point
  push();
  if (controlOptions.showLine) {
    stroke(0);
  }
  else if (!controlOptions.showLine) {
    noStroke();
  }
  line(character.x, character.y, indication.x, indication.y);
  pop();

  // Drawing true and fake points
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

// Key Settings
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
