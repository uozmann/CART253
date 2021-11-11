// Prototype Project 2: The maze
// Man Zou


"use strict";

// Fonts
let irishGroverRegular;
let cairoRegular;
let caveatRegular;
let poiretRegular;
let bg = {
  cave: undefined,
};
let lineCave = [`Where am I...(click to continue)`, `A dead corpse (click to continue)`, `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. (click to continue)`,]
let currentLine = 0;

// Initial state
let state = `title`;
let purple = {
  r: 145, 
  g: 40, 
  b: 200,
};
let white = {
  r: 255, 
  g: 254, 
  b: 245,
};
let yellow = {
  r: 255, 
  g: 245, 
  b: 110,
};
let mazeBlocks = [];
let numMazeBlocks = 35;

let soul = {
  x: 100,
  y: 50,
  size: 20,
};

let rotationButton = {
  x: 1000,
  y: 550,
  size: 50,
};

// Loading images and text font
function preload() {
  irishGroverRegular = loadFont(`assets/fonts/Irish Grover/IrishGrover-Regular.ttf`); 
  cairoRegular = loadFont(`assets/fonts/Cairo/Cairo-Regular.ttf`);
  caveatRegular = loadFont(`assets/fonts/Caveat/Caveat-Regular.ttf`); 
  poiretRegular = loadFont(`assets/fonts/Poiret/PoiretOne-Regular.ttf`); 
  bg.cave = loadImage(`assets/images/bgcave.jpg`);
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  let x = 0;
  let y = 5;
  let xDisplacement = 220
  let yDisplacement = 250
  for (let i = 0; i < numMazeBlocks; i++) {
    x += xDisplacement;
    if (x>= width - 150) {
      x = 0;
      y += yDisplacement;
    }
    let mazeBlock = new MazeStandard(x, y);
    mazeBlocks.push(mazeBlock);
  }

}

function draw() {
  switch (state) {
  case `title`:
    title();
    break;

  case `cave`:
    cave();
    break;

  case `maze`:
    maze();
    break;

  case `clue1`:
    clue1();
    break;

  case `clue2`:
    clue2();
    break;

  case `clue3`:
    clue3();
    break;

  case `clue4`:
    clue4();
    break;

  case `clue5`:
    clue5();
    break;

  case `ending`:
    ending();
    break;
  
  case `narrative`:
    narrative();
    break;
  }

}

function title() {
  background(purple.r, purple.g, purple.b);

  fill(255);
  textAlign(CENTER, CENTER);

  push();
  textFont(irishGroverRegular);
  textSize(200);
  text(`The Maze`, width / 2, height / 3);
  pop();

  push();
  textFont(poiretRegular);
  textSize(32);
  text(`A tale of the Cloud of Eternal Sorrow re-imagined`, width/2, height/2 );
  pop();

  push();
  textFont(poiretRegular);
  textSize(24);
  text(`Press to Start`, width/2, height*3 / 4);
  pop();
}

// A soul wakes up in a cave and see a dead corpse. He/she is wondering who he/she is; and to who the corpse belongs to. 
function cave(){
  background(purple.r, purple.g, purple.b);
  // image(bg.cave, 0, 0, width, height);

  push();
  textFont(irishGroverRegular);
  textSize(40);
  text(`[There is going to be some background and characters here]`, width / 2, height / 3);
  pop();
  
  push();
  let dialog = lineCave[currentLine];
  textFont(poiretRegular);
  textSize(32);
  fill(0);
  text(dialog, width/2, height*7/8 );
  pop();

  if (currentLine === lineCave.length) {
    state = 'maze';
  }
}

// The soul then tries to leave the cave and falls under a maze. The walls of the maze are all moving depending on the time. The soul will need to find clues hinting at their identities.
function maze(){
  background(white.r, white.g, white.b);

  push();
  noStroke();
  fill(yellow.r, yellow.g, yellow.b);
  ellipse(soul.x, soul.y, soul.size);
  // Keyboard Command
  if (keyIsDown(65)) {
    soul.x += -5;
  }
  if (keyIsDown(68)) {
    soul.x += 5;
  }
  if (keyIsDown(83)) {
    soul.y += 5;
  }
  if (keyIsDown(87)) {
    soul.y += -5;
  }
  pop();

  push();
  fill(purple.r, purple.g, purple.b);
  ellipse(rotationButton.x, rotationButton.y, rotationButton.size);
  pop();

  // display the maze
  for (let i = 0; i < mazeBlocks.length; i++) {
    let mazeblock = mazeBlocks[i];
    mazeblock.display();
    let dTriggerRotation = dist(rotationButton.x, rotationButton.y, soul.x, soul.y);
    if (dTriggerRotation <= rotationButton.size/2 + soul.size/2) {
    mazeblock.rotate();
    }
  }

  
  
}

// [the princess meets the boy]
function clue1(){
  background(purple.r, purple.g, purple.b);
}

// [the princess being carried to the cave by the boy]
function clue2(){
  background(purple.r, purple.g, purple.b);
}

// [the king asking the priest to get the princess]
function clue3(){
  background(purple.r, purple.g, purple.b);
}

// [the boy going back to the palace to get the treasure cloth]
function clue4(){
  background(purple.r, purple.g, purple.b);
}

// [the boy petrified by the priest]
function clue5(){
  background(purple.r, purple.g, purple.b);
}

// The soul exit the maze and sees itself again in its dear country. She remembers who she is (the princess), and flies to the sky. Her sad tears became the rain pouring  on Er Hai
function ending(){
  background(purple.r, purple.g, purple.b);
}

// The real legend is written.
function narrative(){
  background(purple.r, purple.g, purple.b);
}

function keyPressed() {
 
}

function mousePressed() {
  if (state === 'title') {
    state = 'cave';
  }
  if (state === 'cave'|| 'clue1' || 'clue2' || 'clue3' || 'clue4' || 'clue5') {
    currentLine = currentLine + 1;
  }
  // if (state === 'maze') {
  //   state = 'ending';
  // }
}