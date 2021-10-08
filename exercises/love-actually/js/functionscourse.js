// Gradient Lines
// function setup() {
//   createCanvas(500,500);
// }
//
// function draw() {
//   background(0);
//   // We call parallels each time with a single OBJECT as the argument, containing one property for
//   // each parameter we're wanting to use
//   parallels({x: 0, y: 200, numLines: 100, lineThickness: 1, lineHeight: 100, lineSpacing: 4});
//   parallels(0, 300, 20, 10, 50, 12);
//   parallels(0, 350, 80, 5, 5, 6);
// }
//
// function parallels({x, y, numLines, lineThickness, lineHeight, lineSpacing}) {
//   for (let i = 0; i < numLines; i++) {
//     noStroke();
//     let lineFill = map(i, 0, numLines, 0, 255);
//     fill(lineFill);
//     rectMode(CENTER);
//     rect(x, y, lineThickness, lineHeight);
//     x = x + lineSpacing;
//   }
// }

// function setup() {
//   createCanvas(500, 500);
// }
//
// function draw() {
//   background(0);
//   // We assign the return value of randomColor() into our color variable
//   // so it will have an object with three random color properties
//   let color = randomColor();
//   fill(color.result.r, color.result.g, color.result.b);
//   ellipse(250, 250, 100, 100);
// }
//
// function randomColor() {
//   let result = {
//     r: random(0, 255),
//     g: random(0, 255),
//     b: random(0, 255)
//   };
//   return result;
// }

// function setup() {
//   createCanvas(500, 500);
// }
//
// function draw() {
//   background(127);
//
//   textAlign(CENTER, CENTER);
//   // Make the font size respond to the mouse
//   let size = map(mouseX, 0, width, 12, 128);
//   textSize(size);
//   textStyle(BOLD);
//
//   // Make the fill respond to the mouse
//   let red = map(mouseX, 0, width, 100, 200);
//   let green = map(mouseY, 0, height, 100, 200);
//   let blue = map(mouseX + mouseY, 0, width + height, 100, 200);
//   fill(red, green, blue);
//
//   // Make the stroke color respond to the mouse
//   let strokeShade = map(mouseX, 0, width, 0, 255);
//   stroke(strokeShade);
//
//   // Make the stroke weight respond to the mouse
//   let weight = map(mouseY, 0, height, 0, 40);
//   strokeWeight(weight);
//
//   text(`Hello, World!`, 250, 250);
// }

// let noiseScale=0.02;
//
// function setup() {
//   createCanvas(500,500);
// }
// function draw() {
//   background(0);
//   for (let x=0; x < width; x++) {
//     let noiseVal = noise((mouseX/width, mouseY*noiseScale));
//     stroke(noiseVal*255);
//     line(x, mouseY+noiseVal*80, x, height);
//   }
// }

// How many lines projecting from the center in a circle?
// let lines = 100;
// // A base time value we'll increase to make the lines wave
// let baseT = 0;
//
// function setup() {
//   createCanvas(400, 400);
// }
//
// function draw() {
//   background(0);
//   // Translate to the centre for rotation purposes
//   translate(width/2, height/2);
//   // A light stroke
//   stroke(200);
//   // Loop through all the lines we need to draw
//   for (let i = 0; i < lines; i++) {
//     // Rotate by one increment based on the number of lines there are
//     rotate(TWO_PI/lines);
//     // Calculate the time parameter for this line based on the base
//     // plus a number based on the line number in the loop
//     let t = baseT + i*1000;
//     // Calculate the length of the line based on the time parameter
//     // so it waves
//     let length = map(noise(t), 0, 1, 50, 200);
//     // A slightly light stroke weight
//     strokeWeight(0.75);
//     // Draw the line!
//     line(0, 0, length, 0);
//     // Draw a point at the end of the line for a little visual flourish
//     point(length + 5, 0);
//   }
//   // Increase the base time so things move
//   baseT += 0.03;
// }

let typing = ``; // Empty string to begin with

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(0);

  // Display our cumulative typing variable on the canvas...
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text(typing, width / 2, height / 2);
}

function keyTyped() {
  // Whenever a "typeable" key is pressed, add the most recent key to our typing string
  // (Using + with two strings like this is called concatenation, adding them together)
  typing = typing + key;
  typing = constrain(typing, 0, 5);
}
