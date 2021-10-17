"use strict";

let school = [];
let schoolSize = 4;

function setup() {
  createCanvas(600, 600);

  for (let i = 0; i < schoolSize; i++) {
    // Create a fish
    let fish = createFish(random(0, width), random(0, height));
    // Add the fish to our array
    school.push(fish);
  }
}
// mousePressed() checks whether a fish in the school was clicked
// and removes it if so
function mousePressed() {
  // Use a for loop to examine every fish in the school one by one
  for (let i = 0; i < school.length; i++) {
    // Store the current fish in the fish variable
    let fish = school[i];
    // Calculate the distance between the mouse position and the fish
    let d = dist(mouseX, mouseY, fish.x, fish.y);
    // If the distance means the mouse was clicked inside the fish
    if (d < fish.size / 2) {
      // Remove the fish using the splice() function which takes two arguments
      // - The index to start remove elements from (i in our case)
      // - The number of elements to remove from that position (just one for us)
      school.splice(i, 1);
      // Now that we've found our fish to remove, we don't want to continue
      // going through the loop, so we end it prematurely with break
      // This forces the for-loop to stop immediately
      break;
    }
  }
}