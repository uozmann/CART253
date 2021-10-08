// Exercise3: Love-actually
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
// Background image
let bg;
// Time control
let t = 0;
// Initial state
let state = `title`;
// Player circle controlled with the mouse
let player ={
  x: undefined,
  y: undefined,
  size: 100,
}
// Ennemy circle moving up and down controlled by Perlin noise values
let ennemy = {
  x: undefined,
  y: undefined,
  vy:0,
  size: 200,
}
// Lover circle moving in circle, controlled with cos and sin functions
let lover = {
  x: undefined,
  y: undefined,
  size: 300,
}

// Loading images and text font
function preload() {
  cairoBlack = loadFont(`assets/fonts/Cairo/Cairo-Black.ttf`);
  cairoRegular = loadFont(`assets/fonts/Cairo/Cairo-Regular.ttf`);
  bg = loadImage(`assets/images/cloudgirl-bg.jpg`)
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
  background(bg);
  fill(255);
  textAlign(CENTER, CENTER);

  push();
  textFont(cairoBlack);
  textSize(200);
  text(`Isn't it lovely?`, width / 2, height / 3);
  pop();

  push();
  textFont(cairoRegular);
  textSize(24);
  text(`Start`, width/5, height*3 / 4);
  pop();

  let dStartGame = dist(mouseX, mouseY, width/5, height*3 / 4);
  if(dStartGame < 10) {
    state = 'game';
  }
}

function game(){
  background(63,116,254);
  noStroke();

  push();
  // moving background with white circles; code and math formulas inspired from P5 library at: https://p5js.org/examples/interaction-wavemaker.html
  for (let x = 0; x <= width; x += 50) {
    for (let y = 0; y <= height; y += 50) {

      let xAngle = map(mouseX, 0, width, PI, 4 * PI, true);
      let yAngle = map(mouseY, 0, height, -PI, PI, true);
      let angle = xAngle * (x / width) + yAngle * (y / height);
      let circleX = x + 20 * cos(2 * PI * t + angle);
      let circleY = y + 20 * sin(2 * PI * t + angle);
      fill(255,255,255,100);
      ellipse(circleX, circleY, 100);
    }
  }
  t = t + 0.01; // code from P5 library ends here
  pop();
  // Player position controlled by the mouse
  push();
  player.x = mouseX;
  player.y = mouseY;
  ellipse(player.x, player.y, player.size);
  pop();
  // Lover's circle movements
  push();
  lover.x = width/2 + 100 * cos(2 * PI * t + 360);
  lover.y = height/2 + 100 * sin(2 * PI * t + 360);
  stroke(255);
  strokeWeight(20);
  noFill();
  ellipse(lover.x, lover.y, lover.size);
  pop();
  // Ennemy's circle moving on y axis up and down according to Perlin Noise variables
  push();
  ennemy.y = map(noise(t), 0, 1, 0, height);
  ennemy.x = width/2;
  fill(40,40,114);
  ellipse(ennemy.x, ennemy.y, ennemy.size);
  pop();
  // To see if the player is in the lover's circle and if it touches the ennemy
  let dPlayerEnnemy = dist(player.x, player.y, ennemy.x, ennemy.y);
  let dPlayerLover = dist(player.x, player.y, lover.x, lover.y);
  let dEnnemyLover = dist(ennemy.x, ennemy.y, lover.x, lover.y);
  if(dPlayerEnnemy > ennemy.size/2 + player.size/2 && dPlayerLover < lover.size/2 ) {
    state = 'ending';
  }
  else if (dPlayerEnnemy < ennemy.size/2 + player.size/2) {
    state = `ending2`;
  }
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
