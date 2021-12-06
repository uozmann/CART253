// Project1: Life Story
// Man Zou

"use strict";
// Fonts
let cairoBlack;
let cairoRegular;
// Images and Sounds
let titleFill;
let bubbleMask;
let titleSFX, gameSFX, bubbleSFX;

// State
let state = 'title';

// Drawing lines 
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

// Bottom zone to switch to the end
let gameDangerZone = {
  x: 0,
  y: 650,
  width: 1000,
  height: 50,
}

// Player
let player = {
  x: 0,
  y: 0,
  size: 50,
  vx: 0,
  vy: 0,
  speed: 0.01,
}

// Bubbles
let steppingGrounds = [];
let nbrSteppingGrounds = 5;

//Animation
let t = 0;
let t2 = 0;
let animationTrigger;
let bubbleTriggered = false;
let bubbleAnimation = 0;
let pink = 220;
let redBubble;
let greenBubble;
let blueBubble;
let coswave = [];
let particles = [];
let clouds = [];

//Sound from mic
let mic;


// Loading images, sounds and text font
function preload() {
  cairoBlack = loadFont(`assets/fonts/Cairo/Cairo-Black.ttf`);
  cairoRegular = loadFont(`assets/fonts/Cairo/Cairo-Regular.ttf`);
  titleFill = loadImage(`assets/images/title-bg.jpg`);
  bubbleMask = loadImage(`assets/images/bubble-mask.jpg`);
  titleSFX = loadSound(`assets/sounds/title-start.mp3`);
  gameSFX = loadSound(`assets/sounds/game-play.mp3`);
  bubbleSFX = loadSound(`assets/sounds/bubble-sound.mp3`);
}


function setup() {
  createCanvas(1000, 700);

  // Creating array for the bubbles
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

  //creating line animation
  for (let i = 0; i < width; i++) {
    let amount = map(i, 0, width, 0, PI);
    coswave[i] = abs(cos(amount));
  }

  //creating particle animation
  for(let i = 0;i<width/10;i++){
    particles.push(new Particle());
  } 

  //creating cloud animation
  for(let i = 0;i<width/10;i++){
    clouds.push(new Cloud());
  } 

  // start the Audio Input.
  mic = new p5.AudioIn();
  // By default, it does not .connect() (to the computer speakers)
  mic.start();
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
  background(8, 105, 150);
  // blendMode(BLEND);
  // fill(255);
  fill(255, 255, 255, 100);
  textAlign(CENTER, CENTER);
  push();
  
  cloudAnimation();
  pop();
  
  // image(titleFill, 0, 0);
  

  // Background animation
  push();
  stroke(240,220,220);
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
  fill(0);
  textFont(cairoBlack);
  textSize(100);
  text(`On the Clouds`, width / 2, height/3);
  pop();

  // Start command text
  push();
  fill(0);
  textFont(cairoRegular);
  textSize(24);
  text(`Hover HERE to play`, width/2, height*3 / 4);
  let dStartGame = dist(mouseX, mouseY, width/2, height*3 / 4);
  if(dStartGame < 10) {
    titleSFX.play();
    state = 'game';
  }
  pop();


}


function game() {
  // Setting up the background
  background(150, 200, 255);
  // background(240, 220, 220);
  // image(bubbleMask, 0, 0);

  push();
  if (animationTrigger) {
    let colour = 255;
    colour += -30;
    let noiseVal = 0;
    noiseVal = noiseVal + 0.01;
    let opacity = noise(noiseVal) *200;
    circleAnimation(255, opacity);
    if (bubbleAnimation >= 1) {
      let end = player.y*1.1;
      lineAnimation(end);
    }
    if (bubbleAnimation >= 2) {
      let end = player.y*1.1;
      lineAnimation(end);
      particleAnimation();
    }
    if (bubbleAnimation >= 3) {
      let end = player.y*1.1;
      lineAnimation(end);
      particleAnimation();
      let strokeColour= player.x*0.5
      parametricAnimation(strokeColour);
    }
    if (bubbleAnimation >= 4) {
      let end = player.y*1.1;
      lineAnimation(end);
      particleAnimation();
      let strokeColour= player.x*0.5
      parametricAnimation(strokeColour);
      cloudAnimation();
    }

  }
  pop();

 
  // Danger zone at the bottom
  push();
  fill(50);
  rect(gameDangerZone.x, gameDangerZone.y, gameDangerZone.width, gameDangerZone.height);
  pop();

  // Background animation 
  push();
  micAnimation();
  stroke(pink, pink+20, pink+50);
  strokeWeight(1);
  // Creating array for the lines drawn by the player
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
  // User control
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
      animationTrigger = true;
    }
    if (player.y < 25) {
      player.vy += player.speed;
    }
  }

  let d0 = dist(steppingGrounds[0].x, steppingGrounds[0].y, player.x, player.y);
  if(d0 <= player.size/2 + steppingGrounds[0].size/2) {
    bubbleAnimation = 0;
  }

  let d1 = dist(steppingGrounds[1].x, steppingGrounds[1].y, player.x, player.y);
  if(d1 <= player.size/2 + steppingGrounds[1].size/2) {
    bubbleAnimation = 1;
  }

  let d2 = dist(steppingGrounds[2].x, steppingGrounds[2].y, player.x, player.y);
  if(d2 <= player.size/2 + steppingGrounds[2].size/2) {
    bubbleAnimation = 2;
  }

  let d3 = dist(steppingGrounds[3].x, steppingGrounds[3].y, player.x, player.y);
  if(d3 <= player.size/2 + steppingGrounds[3].size/2) {
    bubbleAnimation = 3;
  }

  let d4 = dist(steppingGrounds[4].x, steppingGrounds[4].y, player.x, player.y);
  if(d3 <= player.size/2 + steppingGrounds[4].size/2) {
    bubbleAnimation = 4;
  }
  pop();

  // Balls bounding on the screen
  push();
  // Setting up colour variation for the bubbles and alpha variation
  // let redBubble = map(player.x, 0, width, 200, 255);
  // let greenBubble = map(player.x, 0, height, 230, 255);
  // let blueBubble = map(player.y, 0, width, 250, 255);
  let transparencyBubble = map(player.y, 0, height, 200, 100);
  fill(redBubble, greenBubble, blueBubble, transparencyBubble);
  noStroke();
  // Creating the movements of the bubbles
  for ( let i = 0; i < steppingGrounds.length; i++) {
    let steppingGround = steppingGrounds[i];
    steppingGround.x += steppingGround.vx;
    steppingGround.y += steppingGround.vy;

    steppingGround.x = constrain(steppingGround.x, 0, width);
    steppingGround.y = constrain(steppingGround.y, 0, height);
    ellipse(steppingGround.x, steppingGround.y, steppingGround.size);
    // Setting up gravity and bouncing effect
    if(steppingGround.x > 950 || steppingGround.x < 50) {
      steppingGround.vx = -steppingGround.vx;
    }
    if (steppingGround.y > 650) {
      steppingGround.y = 650
      steppingGround.vy = -steppingGround.vy;
      // steppingGround.vy *= 0.99; this could be used to increase the speed it gets lower each times
    }
      steppingGround.vy += 0.2;
  }
  pop();

  // Conditions for end of the game
  if(player.y >= gameDangerZone.y) {
    titleSFX.play();
    fill(0);
    // state = 'ending';
    // Text
  push();
  textFont(cairoBlack);
  textSize(100);
  text(`Inside Bubbles`, width / 2, height / 3);
  pop();

  // Text
  push();
  textFont(cairoRegular);
  textSize(24);
  text(`May all worries fly away`, width/2, height*2 / 3);
  text(`Press "CTRL + R" to restart`, width/2, height*3/4);
  transparencyBubble = 0;
  noLoop();
  pop();
  }
  }

function micAnimation() {
  push();
  let micVol = mic.getLevel()*10;
    pink = micVol*255 + 150;
    redBubble = micVol*200;
    greenBubble = micVol*250;
    blueBubble = micVol*255;
  pop();

}

// Background animation white circles
function circleAnimation(colour, opacity) {
  push();
  // moving background with white circles; code and math formulas inspired from P5 library at: https://p5js.org/examples/interaction-wavemaker.html
  for (let x = 0; x <= width; x += 50) {
    for (let y = 0; y <= height; y += 50) {

      let xAngle = map(player.x, 0, width, PI, 4 * PI, true);
      let yAngle = map(player.y, 0, height, -PI, PI, true);
      let angle = xAngle * (x / width) + yAngle * (y / height);
      let circleX = x + 20 * cos(1 * PI * t + angle);
      let circleY = y + 20 * sin(1 * PI * t + angle);
      fill(colour,colour - 20, colour -10, opacity);
      noStroke();
      ellipse(circleX, circleY, 100);
    }
  }
  t = t + 0.01; // code from P5 library ends here
  pop();
}

function lineAnimation(end) {
  //lines with colour variation
  push();
  for (let i = 0; i < width; i += 3) {
    let strokeVal = noise((player.x+i)*0.02, player.y*0.02);
    stroke(strokeVal*255, pink, 255, strokeVal*255);
    line(i, end+strokeVal*height, i, player.y+strokeVal*80);
  }
  pop();
}

function particleAnimation() {
  push();
  for(let i = 0;i<particles.length;i++) {
    particles[i].moveParticle();
    particles[i].joinParticles(particles.slice(i));
  }
  pop();
}

function cloudAnimation() {
  push();
  for(let i = 0;i<clouds.length;i++) {
    clouds[i].moveCloud();
    clouds[i].joinClouds(clouds.slice(i));
  }
  pop();
}

function parametricAnimation(strokeColour) {
  push();
  translate(width/2,height/2);
  stroke(strokeColour);
  //loop for adding 100 lines
  for(let i = 0;i<100;i++){
    line(x1(t+i),y1(t+i),player.x, player.y);
  }
  t2 += 0.15;
  pop();
}

//initial x co-ordinate of the line
function x1(t){
  return sin(t/10)*125+sin(t/20)*125+sin(t/30)*125;
}

// function to change initial y co-ordinate of the line
function y1(t){
  return cos(t/10)*125+cos(t/20)*125+cos(t/30)*125;
}
  

// Ending
// function ending(){
//   // background image
//   background(50);
//   fill(240, 220, 220);
//   image(titleFill, 0, 0);

//   // Recreating the painted motif from game
//   push();
//   stroke(120, 100, 100, 50);
//   strokeWeight(3);
//   for ( let i = 0; i < bgPoints.trail.length; i++ ) {
//     let pastPoints = bgPoints.trail[i];
//     point(pastPoints.x, pastPoints.y);
//     line(pastPoints.x, pastPoints.y, bgPoints.x, bgPoints.y);
//   }
//   bgPoints.x = player.x;
//   bgPoints.y = player.y;
//   point(bgPoints.x, bgPoints.y);
//   let newTrailPosition = {
//     x: bgPoints.x, 
//     y: bgPoints.y,
//   };
//   bgPoints.trail.push(newTrailPosition);
//   pop();

//   // Text
//   push();
//   textFont(cairoBlack);
//   textSize(100);
//   text(`End`, width / 2, height / 3);
//   pop();

//   // Text
//   push();
//   textFont(cairoRegular);
//   textSize(24);
//   text(`Your bubble painting has been created`, width/2, height*2 / 3);
//   text(`Press "CTRL + R" to restart`, width/2, height*3/4);
//   pop();
// } 

// Sources used:
// Simulation concept comes from myself.
// Simulation codes come from myself with the help of course material and Pippin.
// Images and visual elements are painted and created by myself.
// Sounds effect comes from the open-source platform aigei.com.