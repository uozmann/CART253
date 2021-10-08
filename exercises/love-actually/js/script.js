// Exercise3: Love-actually
// Man Zou
// Change the way the user controls their circle:
// Add at least one new if-statement:
// Change the way the simulation looks:
// Use at least one image:

"use strict";
let cairoBlack;
let cairoRegular;
let bg;
let t = 0;
let state = `title`;
let player ={
  x: undefined,
  y: undefined,
  size: 100,
}
let ennemy = {
  x: undefined,
  y: undefined,
  vy:0,
  size: 200,
}
let lover = {
  x: undefined,
  y: undefined,
  size: 300,
}

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
  // background white dots; code and math formulas inspired from P5 library at: https://p5js.org/examples/interaction-wavemaker.html
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

  push();
  player.x = mouseX;
  player.y = mouseY;
  ellipse(player.x, player.y, player.size);
  pop();

  push();
  lover.x = width/2 + 100 * cos(2 * PI * t + 360);
  lover.y = height/2 + 100 * sin(2 * PI * t + 360);
  stroke(255);
  strokeWeight(20);
  noFill();
  ellipse(lover.x, lover.y, lover.size);
  pop();

  push();
  ennemy.y = map(noise(t), 0, 1, 0, height);
  ennemy.x = width/2;
  fill(40,40,114);
  ellipse(ennemy.x, ennemy.y, ennemy.size);
  pop();

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

function keyPressed() {
  if (key === 'r') {
    state = 'title';
    loop();
  }
}
