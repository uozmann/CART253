"use strict";
// let bgPoints = {
//   x: 0,
//   y: 0,
//   vx: 0,
//   vy: 0,
//   speed: 5,
//   nbr: 2000,
//   trail: [],
// }

let steppingGrounds = [];
let nbrSteppingGrounds = 5;

function preload() {
}

function setup() {
  createCanvas(1000, 700);
  for ( let i = 0; i < nbrSteppingGrounds; i++) {
    let steppingGround = {
      nbr: 10,
      x: random(0, width),
      y: random(0, height),
      size: 100,
      vx: 2,
      vy: 2,
    }
    steppingGrounds.push(steppingGround);
  }
}

function draw() {
  game();
}

function game() {
  background(240, 220, 220);
  fill(255);
  
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
    if(steppingGround.y > 650 || steppingGround.y < 50) {
    steppingGround.vy = -steppingGround.vy;
    }

  }

  // Balls
  // push();
  // fill (255);
  // steppingGround.x += steppingGround.vx;
  // steppingGround.y += steppingGround.vy;

  // steppingGround.x = constrain(steppingGround.x, 0, width);
  // steppingGround.y = constrain(steppingGround.y, 0, height);
  // ellipse(steppingGround.x, steppingGround.y, steppingGround.size);

  // if(steppingGround.x === 950 || steppingGround.x === 50) {
  //   steppingGround.vx = -steppingGround.vx;
  // }
  // if(steppingGround.y === 650 || steppingGround.y === 50) {
  //   steppingGround.vy = -steppingGround.vy;
  }
  // for ( let i = 0; i < bubbles.length; i++) {
  //   displayBubbles(bubbles[i]);
  //   moveBubbles(bubbles[i]);
    
  // }
  
 
  // steppingGround.bubbles.push(newBubblePosition);
//   pop();
// }

function title() {
  background(50);
  fill(255);
  textAlign(CENTER, CENTER);

  // Background animation
  push();
  stroke(240, 220, 160);
  strokeWeight(3);

  bgPoints.x = mouseX;
  bgPoints.y = mouseY;
  point(bgPoints.x, bgPoints.y);
  let newTrailPosition = {
    x: bgPoints.x, 
    y: bgPoints.y,
  };
  bgPoints.trail.push(newTrailPosition);

  if (bgPoints.trail.length>=2) {
    // point(bgPoints.trail[0].x, bgPoints.trail[0].y);
    for ( let i = 0; i < bgPoints.trail.length-1; i++ ) {
      let pastPoints = bgPoints.trail[i];
      let nextPoints = bgPoints.trail[i+1];
      // point(nextPoints.x, nextPoints.y);
      line(pastPoints.x, pastPoints.y, nextPoints.x, nextPoints.y);
    }
  }
  pop();
}