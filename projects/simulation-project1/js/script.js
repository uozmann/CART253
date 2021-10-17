// Project1: Life Story
// Man Zou

"use strict";
// Fonts
let cairoBlack;
let cairoRegular;
let state = 'title'
let bgTitle = {
  r: 100,
  g: 100,
  b: 120,
};

let bgGame = {
  r: 240, 
  g: 220,
  b: 160,
};

let bgEnding;
let bgPoints = {
  x: 0,
  y: 0,
  vx: 0,
  vy: 0,
  speed: 5,
  nbr: 2000,
  trail: [],
}
let bgAutoPoints = {
  x: 0,
  y: 0,
  vx: 0,
  vy: 0,
  speed: 5,
  nbr: 2000,
  trail: [],
}

// Loading images and text font
function preload() {
  cairoBlack = loadFont(`assets/fonts/Cairo/Cairo-Black.ttf`);
  cairoRegular = loadFont(`assets/fonts/Cairo/Cairo-Regular.ttf`);
  bgGame = loadImage(`assets/images/cloudgirl-bg.jpg`)
}

function setup() {
  createCanvas(1000, 700);
}

function draw() {
  switch (state) {
  case `title`:
    title();
    break;

  case `game`:
    game();
    break;

  case `ending`:
    ending();
    break;
  }
}

function title() {
  background(bgTitle.r, bgTitle.g, bgTitle.b);
  fill(255);
  textAlign(CENTER, CENTER);

  // Title text
  push();
  textFont(cairoBlack);
  textSize(100);
  text(`A simple life story`, width / 2, height / 3);
  pop();

  // Start command text
  push();
  textFont(cairoRegular);
  textSize(24);
  text(`Hover here to play`, width/2, height*3 / 4);
  let dStartGame = dist(mouseX, mouseY, width/2, height*3 / 4);
  if(dStartGame < 10) {
    state = 'game';
  }
  pop();

  // Background animation
  push();
  stroke(220);
  strokeWeight(10);
  for ( let i = 0; i < bgPoints.trail.length; i++ ) {
    let pastPoints = bgPoints.trail[i];
    point(pastPoints.x, pastPoints.y);
  }
  bgPoints.x = mouseX;
  bgPoints.y = mouseY;
  point(bgPoints.x, bgPoints.y);
  let newTrailPosition = {
    x: bgPoints.x, 
    y: bgPoints.y,
  };

  bgPoints.trail.push(newTrailPosition);
  pop();
}

function game(){
  background(bgGame.r, bgGame.g, bgGame.b);
  background(240, 220, 220);
  fill(255);
  textAlign(CENTER, CENTER);

  // Background animation 
  push();
  stroke(220);
  strokeWeight(10);
  for ( let i = 0; i < bgPoints.trail.length; i++ ) {
    let pastPoints = bgPoints.trail[i];
    point(pastPoints.x, pastPoints.y);
  }
  bgPoints.x = mouseX;
  bgPoints.y = mouseY;
  point(bgPoints.x, bgPoints.y);
  let newTrailPosition = {
    x: bgPoints.x, 
    y: bgPoints.y,
  };

  bgPoints.trail.push(newTrailPosition);
  pop();
  
}

// Good ending
function ending(){
  background(255,255,255);
  fill(40,40,114);

  push();
  textFont(cairoBlack);
  textSize(200);
  text(`Congradulations!`, width / 2, height / 3);
  pop();

  push();
  textFont(cairoRegular);
  textSize(24);
  text(`You found your lover!!!`, width/2, height*2 / 3);
  text(`Press "R" to restart`, width/2, height*3/4);
  pop();

  noLoop();
}

// Bad ending
function ending2(){
  background(0,0,0);
  fill(40,40,114);

  push();
  textFont(cairoBlack);
  textSize(200);
  text(`You Lost!`, width / 2, height / 3);
  pop();

  push();
  textFont(cairoRegular);
  textSize(24);
  text(`You have been interupted by your ennemy!!!`, width/2, height*2 / 3);
  text(`Press "R" to restart`, width/2, height*3/4);
  pop();

  noLoop();
}

// Return to the title page
function keyPressed() {
  if (key === 'r') {
    state = 'title';
    loop();
  }
}
