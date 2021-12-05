
let soul = {
  x: 0,
  y: 0,
  size: 50,
  vx: 5,
  vy: 5,
}
let numSoulTrace = 60;
let pastSoulX = [];
let pastSoulY = [];

function setup() {
  createCanvas(720, 400);
  noStroke();
  fill(255, 153);
  for (let i = 0; i < numSoulTrace; i++) {
    pastSoulX.push(i);
    pastSoulY.push(i);
  }
}

function draw() {
  background(237, 34, 93);

  // Cycle through the array, using a different entry on each frame.
  // Using modulo (%) like this is faster than moving all the values over.
  let current = frameCount % numSoulTrace;
  pastSoulX[current] = soul.x;
  pastSoulY[current] = soul.y;

  for (let i = 0; i < numSoulTrace; i++) {
    // which+1 is the smallest (the oldest in the array)
    let index = (current + 1 + i) % numSoulTrace;
    ellipse(pastSoulX[index], pastSoulY[index], i, i);
  }
  
  push();
  fill(0);
  ellipse(soul.x, soul.y, soul.size);
  if (keyIsDown(65)) {
    soul.x += -soul.vx;
  }
  if (keyIsDown(68)) {
    soul.x += soul.vx;
  }
  if (keyIsDown(83)) {
    soul.y += soul.vy;
  }
  if (keyIsDown(87)) {
    soul.y += -soul.vy;
  }
  pop();
}