"use strict";

let mazeBlocks = [];
let numMazeBlocks = 204;
// Loading images and text font
function preload() {
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  let x =50;
  let y =50;
  for (let i = 0; i < numMazeBlocks; i++) {
    x +=300;
    if (x>= width) {
      x = 50;
      y += 50;
    }
    let mazeBlock = new Circle(x, y);
    mazeBlocks.push(mazeBlock);
  }

}

function draw() {
  background(255);
  for (let i = 0; i < mazeBlocks.length; i++) {
    let mazeblock = mazeBlocks[i];
    mazeblock.display();
  }
}