// Exercise4: Age of Aquarium
// Man Zou
// The goal: enter in the big white circle (lover) while avoiding to touch the blue circle (ennemy)

// Allow the user to control one of the circles: white circle controlled with mouse
// Make the non-user circle move differently: the ennemy circle (blue) moves up and down (Perlin noise); the lover circle moves in the round (cos and sin functions)
// Add at least one extra function: title, game, ending, ending2
// Add at least one extra ending: 2 ending, one winner ending and one loser ending

"use strict";
// Fonts
let cairoBlack;
let cairoRegular;

// Initial state
let state = `title`;
// Player circle controlled with the mouse

// Loading images and text font
function preload() {
  cairoBlack = loadFont(`assets/fonts/Cairo/Cairo-Black.ttf`);
  cairoRegular = loadFont(`assets/fonts/Cairo/Cairo-Regular.ttf`);
}

function setup() {
  createCanvas(windowWidth,windowHeight);
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

  case `ending2`:
    ending2();
    break;
  }
}

function title() {
  background(0);
  fill(255);
  textAlign(CENTER, CENTER);

  push();
  textFont(cairoBlack);
  textSize(200);
  text(`Age of Aquarium`, width / 2, height / 3);
  pop();

  push();
  textFont(cairoRegular);
  textSize(24);
  text(`Press to Start`, width/2, height*3 / 4);
  pop();

  let dStartGame = dist(mouseX, mouseY, width/5, height*3 / 4);
  if(dStartGame < 10) {
    state = 'game';
  }
}

function game(){
  background(63,116,254);
  noStroke();

  
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
  text(`You completed the challenge`, width/2, height*2 / 3);
  text(`Press "CTRL + R" to restart`, width/2, height*3/4);
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
  text(`You have failed the challenge`, width/2, height*2 / 3);
  text(`Press "CTRL + R" to restart`, width/2, height*3/4);
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

function mousePressed() {
  if (state = 'title') {
    state = 'game';
  }
}