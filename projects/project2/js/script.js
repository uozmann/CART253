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
let gameOverTimer = 0;
let gameLength = 60 * 10; // 10 seconds


// Our garden
let garden = {
  // An array to store the individual flowers
  flowers: [],
  numFlowers: 20,
  // An array to store the individual bees
  bees: [],
  numBees: 20,
  // An array to store the individual giant bees the player controles
  giantBees: [],
  numGiantBees: 10,

  // giantBees: [],
  // numBees: 1,
  // The color of the grass (background)
  grassColor: {
    r: 120,
    g: 180,
    b: 120
  }
};

// Loading images and text font
function preload() {
  cairoBlack = loadFont(`assets/fonts/Cairo/Cairo-Black.ttf`);
  cairoRegular = loadFont(`assets/fonts/Cairo/Cairo-Regular.ttf`);
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  // Create our flowers by counting up to the number of the flowers
  for (let i = 0; i < garden.numFlowers; i++) {
    // Create variables for our arguments for clarity
    let x = random(0, width);
    let y = random(0, height);
    let size = random(50, 80);
    let stemLength = random(50, 100);
    let petalColor = {
      r: random(100, 255),
      g: random(100, 255),
      b: random(100, 255)
    }
    // Create a new flower using the arguments
    let flower = new Flower(x, y, size, stemLength, petalColor);
    // Add the flower to the array of flowers
    garden.flowers.push(flower);
  }
  garden.flowers.sort(sortByY);
  // Create our bees by counting up to the number of bees
  for (let i = 0; i < garden.numBees; i++) {
    // Create variables for our arguments for clarity
    let x = random(0, width);
    let y = random(0, height);
    // Create a new bee using the arguments
    let bee = new Bee(x, y);
    // Add the bee to the array of bees
    garden.bees.push(bee);
  }

  // Create our bees by counting up to the number of bees
  for (let i = 0; i < garden.numGiantBees; i++) {
    // Create variables for our arguments for clarity
    let x = random(0, width);
    let y = random(0, height);
    // Create a new bee using the arguments
    let giantBee = new GiantBee(x, y);
    // Add the bee to the array of bees
    garden.bees.push(giantBee);
  }

}

function sortByY(flower1, flower2) {
  // We achieve the above by subtracting flower2's y position
  // from flower1's! How elegant!
  return flower1.y - flower2.y;
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
  background(garden.grassColor.r, garden.grassColor.g, garden.grassColor.b);

  // Loop through all the flowers in the array and display them
  for (let i = 0; i < garden.flowers.length; i++) {
    let flower = garden.flowers[i];
    flower.display();
  }

  fill(255);
  textAlign(CENTER, CENTER);

  push();
  textFont(cairoBlack);
  textSize(200);
  text(`Survival Garden`, width / 2, height / 3);
  pop();

  push();
  textFont(cairoRegular);
  textSize(32);
  text(`Try to grow again the flowers by pressing on them`, width/2, height/2 );
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
  background(garden.grassColor.r, garden.grassColor.g, garden.grassColor.b);

  // Loop through all the flowers in the array and display them
  for (let i = 0; i < garden.flowers.length; i++) {
    let flower = garden.flowers[i];
    if (flower.alive) {
      // Update the flower by shrinking it and displaying it
      flower.shrink(); // NEW! Shrink living flowers every frame
      flower.display();
    }
  }
  
  // Loop through all the bees in the array and display them
  for (let i = 0; i < garden.bees.length; i++) {
    let bee = garden.bees[i];
    // Check if this bee is alive
    if (bee.alive) {
      // Update the bee by shrinking, moving and displaying it
      bee.shrink();
      bee.move();
      for (let j = 0; j < garden.flowers.length; j++) {
        let flower = garden.flowers[j];
        bee.tryToPollinate(flower);
      }

      bee.display();
    }
  }

  for (let i = 0; i < garden.giantBees.length; i++) {
    let giantBee = garden.giantBees[i];
    // Check if this bee is alive
    if (giantBee.alive) {
      // Update the bee by shrinking, moving and displaying it
      giantBee.shrink();
      giantBee.move();
      for (let j = 0; j < garden.bees.length; j++) {
        let bee = garden.bees[j];
        giantBee.poisoned(bee);
      }
      giantBee.display();
    } 
  }

  gameOverTimer++;
  // NEW! Check if we have reached the end of our timer
  if (gameOverTimer >= gameLength) {
    // The game is over! So we should check the win/lose state
    gameOver();
  }


}

function gameOver() {
  if (garden.flowers.numAlive >= 10) {
    // There are no circles left, so the user won!
    state = `ending`;
  }
  else {
    // Otherwise they lost
    state = `ending2`;
  }
}

// Good ending
function ending(){
  background(garden.grassColor.r, garden.grassColor.g, garden.grassColor.b);

  // Loop through all the flowers in the array and display them
  for (let i = 0; i < garden.flowers.length; i++) {
    let flower = garden.flowers[i];
    flower.display();
  }

  push();
  textFont(cairoBlack);
  textSize(200);
  text(`Flowers won!`, width / 2, height / 3);
  pop();

  push();
  textFont(cairoRegular);
  textSize(24);
  text(`The majority of your flowers have not been eaten by bees`, width/2, height*2 / 3);
  text(`Press "CTRL + R" to restart`, width/2, height*3/4);
  pop();

  noLoop();
}

// Bad ending
function ending2(){
  background(garden.grassColor.r, garden.grassColor.g, garden.grassColor.b);

  // Loop through all the flowers in the array and display them
  for (let i = 0; i < garden.flowers.length; i++) {
    let flower = garden.flowers[i];
    flower.display();
  }

  push();
  textFont(cairoBlack);
  textSize(200);
  text(`Bees won!`, width / 2, height / 3);
  pop();

  push();
  textFont(cairoRegular);
  textSize(24);
  text(`Your bees have managed to eat most of the flowers`, width/2, height*2 / 3);
  text(`Press "CTRL + R" to restart`, width/2, height*3/4);
  pop();

  noLoop();
}

// Return to the title page
function keyPressed() {
  let giantBee1 = giantBees[0];
  if (key === 'd') {
    giantBee1.x = 500;
  }
}

function mousePressed() {
  if (state = 'title') {
    state = 'game';
  }
  if (state = 'game') {
    for (let i = 0; i < garden.flowers.length; i++) {
      // Get the current flower in the loop
      let flower = garden.flowers[i];
      // Call the flower's mousePressed() method
      flower.mousePressed();
    }
  }
}