// Project1: Life Story
// Man Zou

"use strict";
// Fonts
let cairoBlack;
let cairoRegular;
let lineFill;
let state = 'title';
let bgPoints = {
  x: 0,
  y: 0,
  vx: 0,
  vy: 0,
  speed: 5,
  nbr: 2000,
  trail: [],
  player: [],
}
let bgPlayerPoints = {
  x: 0,
  y: 0,
  trail: [],
}

let gameDangerZone = {
  x: 0,
  y: 650,
  width: 1000,
  height: 50,
}

let player = {
  x: 0,
  y: 0,
  size: 50,
  vx: 0,
  vy: 0,
  speed: 0.01,
}

let steppingGrounds = [];
let nbrSteppingGrounds = 5;

let bubbles = [];
let bubblesSize = 10;

// Loading images and text font
function preload() {
  cairoBlack = loadFont(`assets/fonts/Cairo/Cairo-Black.ttf`);
  cairoRegular = loadFont(`assets/fonts/Cairo/Cairo-Regular.ttf`);
  lineFill = loadImage(`assets/images/fill-lines.jpg`);
}

function setup() {
  createCanvas(1000, 700);
  for ( let i = 0; i < nbrSteppingGrounds; i++) {
    
    let steppingGround = {
      nbr: 10,
      x: random(100, width-100),
      y: random(60, height-100),
      size: 100,
      vx: 2,
      vy: 5,
    }
    steppingGrounds.push(steppingGround);
  }
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
  background(50);
  fill(255);
  textAlign(CENTER, CENTER);

  // Background animation
  push();
  stroke(lineFill);
  strokeWeight(3);

  for ( let i = 0; i < bgPoints.trail.length; i++ ) {
    let pastPoints = bgPoints.trail[i];
    point(pastPoints.x, pastPoints.y);
    line(pastPoints.x, pastPoints.y, bgPoints.x, bgPoints.y);
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

  // Title text
  push();
  textFont(cairoBlack);
  textSize(100);
  text(`Bubble Canvas`, width / 2, height / 3);
  pop();

  // Start command text
  push();
  textFont(cairoRegular);
  textSize(24);
  text(`Hover HERE to play`, width/2, height*3 / 4);
  let dStartGame = dist(mouseX, mouseY, width/2, height*3 / 4);
  if(dStartGame < 10) {
    state = 'game';
  }
  pop();

}

function game() {
  background(240, 220, 220);
  fill(255);
  textAlign(CENTER, CENTER);

  // Danger zone at the bottom
  push();
  fill(50);
  rect(gameDangerZone.x, gameDangerZone.y, gameDangerZone.width, gameDangerZone.height);
  pop();

  // Background animation 
  push();
  stroke(220, 200, 200);
  strokeWeight(1);

  for ( let i = 0; i < bgPoints.trail.length; i++ ) {
    let pastPoints = bgPoints.trail[i];
    point(pastPoints.x, pastPoints.y);
    line(pastPoints.x, pastPoints.y, bgPoints.x, bgPoints.y);
  }
  bgPoints.x = player.x;
  bgPoints.y = player.y;
  point(bgPoints.x, bgPoints.y);
  let newTrailPosition = {
    x: bgPoints.x, 
    y: bgPoints.y,
  };
  bgPoints.trail.push(newTrailPosition);
  pop();
  
  // Player
  push();
  fill(0);
  player.vy += player.speed;
  player.y = player.y + player.vy;
  player.y = constrain(player.y, 0, height-50);
  player.x = constrain(player.x, 0, width);

  ellipse(player.x, player.y, player.size);
  if (keyIsDown(65)) {
    player.x += -5;
  }
  if (keyIsDown(68)) {
    player.x += 5;
  }
  
  // Player going up a little bit when touching the bubbles
  for ( let i = 0; i < steppingGrounds.length; i++) {
    let steppingGround = steppingGrounds[i];
    let dPlayerBubbles = dist(steppingGround.x, steppingGround.y, player.x, player.y);
    if(dPlayerBubbles < player.size/2 + steppingGround.size/2) {
      player.vy = -2;
    }
    if (player.y < 25) {
      player.vy += player.speed;
    }
  }

  // Conditions for end of the game
  if(player.y >= gameDangerZone.y) {
    state = 'ending';
  }
  pop();

  // Balls bounding on the screen
  push();
  for ( let i = 0; i < steppingGrounds.length; i++) {
    let steppingGround = steppingGrounds[i];
    steppingGround.x += steppingGround.vx;
    steppingGround.y += steppingGround.vy;

    steppingGround.x = constrain(steppingGround.x, 0, width);
    steppingGround.y = constrain(steppingGround.y, 0, height);
    ellipse(steppingGround.x, steppingGround.y, steppingGround.size);

    if(steppingGround.x > 950 || steppingGround.x < 50) {
      steppingGround.vx = -steppingGround.vx;
    }
    if (steppingGround.y > 650) {
      steppingGround.y = 650
      steppingGround.vy = -steppingGround.vy;
      // steppingGround.vy *= 0.99;
    }

    // let dBubbles = dist(steppingGround.x, steppingGround.y, steppingGround.x, steppingGround.y);
    // if(dBubbles <= steppingGround.size) {
      steppingGround.vy += 0.2;
     // }
  }

  pop();
  }
  



// Ending
function ending(){
  background(50);
  fill(240, 220, 220);

  push();
  stroke(120, 100, 100);
  strokeWeight(3);

  for ( let i = 0; i < bgPoints.trail.length; i++ ) {
    let pastPoints = bgPoints.trail[i];
    point(pastPoints.x, pastPoints.y);
    line(pastPoints.x, pastPoints.y, bgPoints.x, bgPoints.y);
  }
  bgPoints.x = player.x;
  bgPoints.y = player.y;
  point(bgPoints.x, bgPoints.y);
  let newTrailPosition = {
    x: bgPoints.x, 
    y: bgPoints.y,
  };
  bgPoints.trail.push(newTrailPosition);
  pop();

  push();
  textFont(cairoBlack);
  textSize(100);
  text(`End`, width / 2, height / 3);
  pop();

  push();
  textFont(cairoRegular);
  textSize(24);
  text(`You touched the ground`, width/2, height*2 / 3);
  text(`Press "CTRL + R" to restart`, width/2, height*3/4);
  pop();
} 
