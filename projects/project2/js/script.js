// Prototype Project 2: The maze
// Man Zou

// Instructions
// When in narration phase, simply mouse click to go through the storyline
// When in the maze, use "awsd" to move; the smaller yellow circle will open the maze so it is easier to move across; the bigger grey circle are clues to pursue the storyline.

// Sources
// Codes come from CART253's course content and my own exploration
// All visuals come from myself
// Sounds come from the open-source platform Aigei.com

// States functions
// title(); cave(); maze(); clue1(); clue2(); clue3(); clue4(); clue5(); ending(); narrative();

// Question: simplifying clues? States and arrays? (js:333)



"use strict";

// Fonts
let irishGroverRegular;
let cairoRegular;
let caveatRegular;
let poiretRegular;

// Images
let bg = {
  cave: undefined,
  maze1: undefined,
  palace: undefined,
  x: undefined,
  y: undefined,


};
let character = {
  soul: undefined,
  soulX: undefined,
  soulY: undefined,

  man: undefined,
  manX: undefined,
  manY: undefined,

  princess: undefined,
  princessX: undefined,
  princessY: undefined,
 
}
let dialogBox = {
  x: undefined,
  y: undefined,
  padding: 30,
}

// Background Music
let bgm = {
  story: undefined,
  maze: undefined,
  collision: undefined,
  hasStarted: false,
}

// Story text arrays
let lineCave = [`Where am I...(click to continue)`, `A dead corpse (click to continue)`, `What is this place? Seems like a cave... (click to continue)`, `Who is this skeleton? (click to continue)`, `I must go out, let's see what's outside the cave... (click to continue)`,];
let lineClue1 = [`This is the story of a poor young man...(click to continue)`, `To whom magic powers have been gifted (click to continue)`, `He can transform himself into anything... (click to continue)`, `So he became a bird, and entered the princess' garden. (click to continue)`, `And they fell in love (click to continue)`,];
let lineClue2 = [`However their love for each other is not tolerated...(click to continue)`, `So in order to stay together they decided to leave the palace (click to continue)`, `The man transformed into a bird and carried the princess to a cave (click to continue)`, `A cave on top of the snow mountain. (click to continue)`, `Where they decided to leve the rest of their life (click to continue)`,];
let lineClue3 = [`This is the story of a poor king...(click to continue)`, `To whom his precious daughter has been taken away (click to continue)`, `He asked a priest to help him bring back his dear one... (click to continue)`, `The priest with his powerful magic searched in the palace (click to continue)`, `And guessed the young man will come back (click to continue)`,];
let lineClue4 = [`The snow mountain was so cold that...(click to continue)`, `The princess could not bear the cold of winter (click to continue)`, `She kindly asked the man to get her precious coat. (click to continue)`, `That can protect her from the hardest cold (click to continue)`, `So the man became a bird and flew to the palace. (click to continue)`,];
let lineClue5 = [`In the palace awaits the priest.(click to continue)`, `He catched the young man and petrified him without mercy (click to continue)`, `Then he left as he is now the most powerful magician. (click to continue)`, `The king could never see his daughter again (click to continue)`, `And the princess could not survive winter in her cave. (click to continue)`,];
let lineEnding = [`The soul exit the maze.(click to continue)`, `And sees the king (click to continue)`, `Alone standing beside the lake (click to continue)`, `Contemplating the left sorrow (click to continue)`, `And the soul remembers. (click to continue)`,];
let currentLine = 0;

// Initial state
let state = `title`;

// Colours
let purple = {
  r: 145, 
  g: 40, 
  b: 200,
};
let white = {
  r: 255, 
  g: 254, 
  b: 245,
};
let yellow = {
  r: 255, 
  g: 245, 
  b: 110,
};
let grey = {
  r: 182, 
  g: 196, 
  b: 207,
}

// The walls of the maze
let mazeBlocks = [];
let numMazeBlocks = 35;

// The player or main character
let soul = {
  x: 100,
  y: 50,
  size: 50,
  vx: 5,
  vy: 5,
};

// Parameter to check collision
let soulTouchesMaze = false;
// Trigger for maze rotation
let rotationButton = {
  x: 925,
  y: 550,
  size: 100,
}

// Trigger for clue narratives
let clueButtonTouched = false;
let clueButtons = [];
let numClueButtons = 5;
let clueStates = [`clue1`, `clue2`, `clue3`, `clue4`, `clue5`];
let clueImages = [];
let numClueImages = 5;
let clues = [];

// Loading images and text font
function preload() {
  irishGroverRegular = loadFont(`assets/fonts/Irish Grover/IrishGrover-Regular.ttf`); 
  cairoRegular = loadFont(`assets/fonts/Cairo/Cairo-Regular.ttf`);
  caveatRegular = loadFont(`assets/fonts/Caveat/Caveat-Regular.ttf`); 
  poiretRegular = loadFont(`assets/fonts/Poiret/PoiretOne-Regular.ttf`); 
  bg.cave = loadImage(`assets/images/bgcave.jpg`);
  bg.maze1 = loadImage(`assets/images/bgmaze1.png`);
  bg.palace = loadImage(`assets/images/bgpalace.jpg`);
  character.man = loadImage(`assets/images/character-man.png`); 
  character.princess = loadImage(`assets/images/character-princess.png`); 
  character.soul = loadImage(`assets/images/character-soul.png`); 
  for (let i = 0; i < numClueImages; i++) { //images for Clue Buttons
    let loadedImage = loadImage(`assets/images/clue-${i}.png`);
    clueImages.push(loadedImage);
  }
  dialogBox = loadImage(`assets/images/ui_dialogbox.png`); 
  bgm.story = loadSound(`assets/sounds/bgm_magicforest.mp3`); 
  bgm.maze = loadSound(`assets/sounds/bgm_maze.mp3`);
  bgm.collision = loadSound(`assets/sounds/bgm_collision.mp3`);
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  userStartAudio();

  // Setting up the maze walls
  let x = 0;
  let y = 5;
  let xDisplacement = 660;
  let yDisplacement = 750;
  for (let i = 0; i < numMazeBlocks; i++) {
    x += xDisplacement;
    if (x>= width*2 - 450) {
      x = 0;
      y += yDisplacement;
    }
    // Setting up a fourthwall depending on random blocks of maze
    let randomNumber = random(0, 100);
    let mazeBlock;
    if (randomNumber > 75) {
      mazeBlock = new MazeStandard(x, y, true);
    }
    else {
      mazeBlock = new MazeStandard(x, y, false);
    }
    
    mazeBlocks.push(mazeBlock);
  }

  // Setting up the buttons for clues
  randomSeed(3);
  for (let i=0; i < numClueButtons; i++) {
    x = random(0, width + width/2);
    y = random(0, height + height/2);
    let clueButton = new ClueButton(x, y, clueStates[i], clueImages[i]);
    clueButtons.push(clueButton);
  }

  // Clues
  clues[0] = new Clue(1, lineClue1);
  clues[1] = new Clue(2, lineClue2);
  clues[2] = new Clue(3, lineClue3);
  clues[3] = new Clue(4, lineClue4);
  clues[4] = new Clue(5, lineClue5);


}

function draw() {
  switch (state) {
  case `title`:
    title();
    break;

  case `cave`:
    cave();
    break;

  case `maze`:
    maze();
    break;

  case `clue1`:
    // clue1();
    clues[0].display();
    break;

  case `clue2`:
    // clue2();
    clues[1].display();
    break;

  case `clue3`:
    // clue3();
    clues[2].display();
    break;

  case `clue4`:
    // clue4();
    clues[3].display();
    break;

  case `clue5`:
    // clue5();
    clues[4].display();
    break;

  case `ending`:
    ending();
    break;
  
  case `narrative`:
    narrative();
    break;
  }
}

// Home Page
function title() {
  background(purple.r, purple.g, purple.b);
  fill(255);
  textAlign(CENTER, CENTER);

  // Header
  push();
  textFont(irishGroverRegular);
  textSize(200);
  text(`The Maze`, width / 2, height / 3);
  pop();

  // Paragraph
  push();
  textFont(poiretRegular);
  textSize(32);
  text(`A tale of the Cloud of Eternal Sorrow re-imagined`, width/2, height/2 );
  pop();

  // Paragraph
  push();
  textFont(poiretRegular);
  textSize(24);
  text(`Press to Start`, width/2, height*3 / 4);
  pop();
}

// A soul wakes up in a cave and see a dead corpse. He/she is wondering who he/she is; and to who the corpse belongs to. 
function cave(){
  background(purple.r, purple.g, purple.b);
  fill(white.r, white.g, white.b);

  // Background images and characters
  push();
  imageMode(CENTER);
  bg.x = map(mouseX, 0, width, 700, width-700);
  bg.y = map(mouseY, 0, height, 200, height-200);
  image(bg.cave, bg.x, bg.y, );
  // character.soulX = map(mouseX, 0, width, 1400, 1600);
  // character.soulY = map(mouseY, 0, height, 400, 600);
  // image(character.soul, character.soulX, character.soulY);
  pop();

  // Dialog text
  push();
  image(dialogBox, 0, 0, width, height);
  let dialogCave = lineCave[currentLine];
  textFont(poiretRegular);
  textSize(32);
  text(dialogCave, width/2, height*7/8 );
  pop();

  if (currentLine === lineCave.length) {
    state = 'maze'; //when the dialog finishes go to the next state
  }
}

// The soul then tries to leave the cave and falls under a maze. The walls of the maze are all moving depending on the time. The soul will need to find clues hinting at their identities.
function maze(){
  if (bgm.hasStarted === false) {
    bgm.hasStarted = true;
    bgm.maze.loop();
    bgm.story.stop();
  }
  background(0);
  noStroke();
  currentLine = 0;

  // Player (soul) settings
  push();
  fill(yellow.r, yellow.g, yellow.b);
  ellipse(soul.x, soul.y, soul.size);
  // ellipse(soul.x, soul.y, character.soul);
  // Keyboard Command (awsd)
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

  // Display trigger button for maze rotation
  push();
  fill(yellow.r, yellow.g, yellow.b);
  ellipse(rotationButton.x, rotationButton.y, rotationButton.size);
  pop();

  // Display the clue Buttons
  for (let i=0; i < clueButtons.length; i++) {
    let clueButton = clueButtons[i];
    clueButton.display();
    clueButton.parallax();

    // Check if the player (soul) touches the clue button and trigger clue narratives
    let dTriggerClue = dist(clueButton.x, clueButton.y, soul.x, soul.y);
    if (dTriggerClue <= clueButton.size/2 + soul.size/2) {
    state = clueButton.state;

      // Placing the player(soul) in the previews position 
      if(soul.x <= clueButton.x) {
        soul.x += -soul.vx;
      }
      else if(soul.x >= clueButton.x) {
        soul.x += soul.vx;
      }
      if(soul.y <= clueButton.y) {
        soul.y += -soul.vy;
      }
      else if(soul.y >= clueButton.y) {
        soul.y += soul.vy;
      }
    }
  }
  // All and each of the clues are viewed?
  if (clues[0].clueViewed && clues[1].clueViewed && clues[2].clueViewed && clues[3].clueViewed && clues[4].clueViewed) {
    state = 'ending';
  }

  // display the maze
  for (let i = 0; i < mazeBlocks.length; i++) {
    let mazeblock = mazeBlocks[i];
    mazeblock.display();
    mazeblock.collision();
    mazeblock.parallax();

    // check if the player(soul) collides with walls of the rectangles and trigger transparency changes
    if (soulTouchesMaze) {
      soul.x = 100;
      soul.y = 50;
      mazeblock.opacity();
      bgm.collision.play();
    }
    
    // Check if the player (soul) touches the rotation button and trigger opening rotation of the maze walls
    let dTriggerRotation = dist(rotationButton.x, rotationButton.y, soul.x, soul.y);
    if (dTriggerRotation <= rotationButton.size/2 + soul.size/2) {
    mazeblock.startMove = true;
    }
    if (mazeblock.startMove === true) {
      mazeblock.move();
    }
  }

  //Frame Borders of the maze
  image(bg.maze1,0,0, width, height);

}


// The soul exit the maze and sees itself again in its dear country. She remembers who she is (the princess), and flies to the sky. Her sad tears became the rain pouring  on Er Hai
function ending(){
  background(purple.r, purple.g, purple.b);
  fill(white.r, white.g, white.b);

  push();
  textFont(irishGroverRegular);
  textSize(40);
  text(`[Ending narratives]`, width / 2, height / 3);
  pop();

  // Dialog text
  push();
  image(dialogBox, 0, 0, width, height);
  let dialogEnding = lineEnding[currentLine];
  textFont(poiretRegular);
  textSize(32);
  text(dialogEnding, width/2, height*7/8 );
  pop();

  if (currentLine === lineClue5.length) {
    state = 'narrative';
  }
  
}

// The real legend is written.
function narrative(){
  background(purple.r, purple.g, purple.b);
  fill(255);

  // Header
  push();
  textFont(irishGroverRegular);
  textSize(40);
  text(`[Real Legend]`, width / 2, height / 3);
  pop();

  // Paragraph
  push();
  textFont(poiretRegular);
  textSize(32);
  text(`Press CTRL + R to restart`, width/2, height/2 );
  pop();
}

function keyPressed() {
 
}

function mousePressed() {
  //start game
  if (state === 'title') {
    state = 'cave';
    bgm.story.loop();
  }
  
  // count the dialog length
  if (state === 'cave'|| 'clue1' || 'clue2' || 'clue3' || 'clue4' || 'clue5') {
    currentLine = currentLine + 1;
  }

}