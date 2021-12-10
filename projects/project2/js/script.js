// Prototype Project 2: The maze
// Man Zou

// Instructions
// When in narration phase, simply mouse click to go through the storyline
// When in the maze, use "awsd" to move; the smaller yellow circle will open the maze so it is easier to move across; the bigger grey circle are clues to pursue the storyline.

// Sources
// Codes come from CART253's course content, p5 Library, consultation with Computational Lab and my own exploration
// All visuals come from myself
// Sounds come from the open-source platform Aigei.com

// States functions
// title(); cave(); maze(); clue1(); clue2(); clue3(); clue4(); clue5(); ending(); narrative();

// Bugs to fix
// 1. Whe pressing "W" and if the player is at the top of the window, 



"use strict";

// Fonts
let irishGroverRegular;
let cairoRegular;
let caveatRegular;
let poiretRegular;

// Images
//Background Images
let bg = {
  cave: undefined,
  maze1: undefined,
  palace: undefined,
  mountain: undefined,
  monastere: undefined,
  caveSky: undefined,
  erhai: undefined,
  wrongClue: undefined,
  x: undefined,
  y: undefined,
  transparency: 0,
};
//Character Images
let character = {
  //left-side character
  character1X: undefined,
  character1Y: undefined,
  //rigth-side character
  character2X: undefined,
  character2Y: undefined,
  //transparency control
  transparency: 0,
  //character images
  man: undefined,
  princess: undefined,
  princessCave: undefined,
  eagle: undefined,
  eaglePrincess: undefined,
  eaglePalace: undefined,
  priest: undefined,
  king: undefined,
  soul: undefined,
  soulSparkles: undefined,
  empty: undefined,
 
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
let lineClue5 = [`In his way awaits the priest.(click to continue)`, `He catched the young man and petrified him without mercy (click to continue)`, `Then he left as he is now the most powerful magician. (click to continue)`, `The king could never see his daughter again (click to continue)`, `And the princess could not survive winter in her cave. (click to continue)`,];
let lineWrongClue = [`I hear voices...Where am I?(click to continue)`, `Ah my head hurts! I should get out of here (click to continue)`,];
let lineEnding1 = [`Now it's the same cave again...(click to continue)`, `I think I know who is this skeleton. (click to continue)`, `Alone standing beside the lake (click to continue)`, `Contemplating the left sorrow (click to continue)`, `And the soul remembers. (click to continue)`,];
let lineEnding2 = [`The soul exit the maze.(click to continue)`, `And sees the king (click to continue)`, `Alone standing beside the lake (click to continue)`, `Contemplating the left sorrow (click to continue)`, `And the soul remembers. (click to continue)`,];
let currentLine = 0;

// Initial state
let state = `maze`;

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
  //special setting for the intro narrative
  xCave: 100,
  vxCave: 5,
  direction: ``,
  blockedDirection: ``,
  collisionTiming: undefined,
};
let numSoulTrace = 60; //trail num
let pastSoulX = []; //trail coordinates
let pastSoulY = []; //trail coordinates

// Parameter to check collision
let soulTouchesMaze = false;
// Trigger for maze rotation
let rotationButton = {
  x: undefined,
  y: undefined,
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
let currentClue = 0;

// Hint ellipse on the soul (player)
let hint;


// Loading images and text font
function preload() {
  irishGroverRegular = loadFont(`assets/fonts/Irish Grover/IrishGrover-Regular.ttf`); 
  cairoRegular = loadFont(`assets/fonts/Cairo/Cairo-Regular.ttf`);
  caveatRegular = loadFont(`assets/fonts/Caveat/Caveat-Regular.ttf`); 
  poiretRegular = loadFont(`assets/fonts/Poiret/PoiretOne-Regular.ttf`); 
  bg.cave = loadImage(`assets/images/bgcave.jpg`);
  bg.maze1 = loadImage(`assets/images/bgmaze1.png`);
  bg.palace = loadImage(`assets/images/bgpalace.jpg`);
  bg.mountain = loadImage(`assets/images/bgmountain.jpg`);
  bg.monastere = loadImage(`assets/images/bgmonastere.jpg`);
  bg.caveSky = loadImage(`assets/images/bgcaveandsky.jpg`);
  bg.erhai = loadImage(`assets/images/bgerhai.jpg`);
  bg.wrongClue = loadImage(`assets/images/bgwrongclue.jpg`);
  character.man = loadImage(`assets/images/character-man.png`); 
  character.princess = loadImage(`assets/images/character-princess.png`);
  character.princessCave = loadImage(`assets/images/character-princesscave.png`);  
  character.eagle = loadImage(`assets/images/character-eagle.png`); 
  character.eaglePrincess = loadImage(`assets/images/character-eagleandprincess.png`); 
  character.eaglePalace = loadImage(`assets/images/character-eagletopalace.png`); 
  character.priest = loadImage(`assets/images/character-priest.png`); 
  character.king = loadImage(`assets/images/character-king.png`); 
  character.soul = loadImage(`assets/images/character-soul.png`); 
  character.soulSparkles = loadImage(`assets/images/character-soulsparkles.png`); 
  character.empty = loadImage(`assets/images/character-empty.png`); 
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
  clueButtons.push(new ClueButton(width*7/4, height*3/2, clueStates[0], clueImages[0]));
  for (let i=1; i < numClueButtons; i++) {
    x = random(0, width + width/2);
    y = random(0, height + height/2);
    let clueButton = new ClueButton(x, y, clueStates[i], clueImages[i]);
    clueButtons.push(clueButton);
  }

  // Clues
  clues[0] = new Clue(1, lineClue1, bg.palace, character.princess, character.man);
  clues[1] = new Clue(2, lineClue2, bg.mountain, character.eagle, character.empty);
  clues[2] = new Clue(3, lineClue3, bg.monastere, character.king, character.priest);
  clues[3] = new Clue(4, lineClue4, bg.caveSky, character.eaglePalace, character.princessCave);
  clues[4] = new Clue(5, lineClue5, bg.erhai, character.empty, character.priest);

  //Player trail
  for (let i = 0; i < numSoulTrace; i++) {
    pastSoulX.push(i);
    pastSoulY.push(i);
  }

  //Rotational Button
  rotationButton.x = width*9/10;
  rotationButton.y = height/10;
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

  case `wrongClue`:
    wrongClue();
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
  background(0);
  fill(white.r, white.g, white.b);

  // Background images and characters
  push();
  imageMode(CENTER);
  if (bg.transparency < 255){
    fadeIn();
  }
  bg.x = map(mouseX, 0, width, 700, width-700);
  bg.y = map(mouseY, 0, height, 200, height-200);
  image(bg.cave, bg.x, bg.y,);

  //Sparkles
  character.character1X = map(mouseX, 0, width, 400, 600);
  character.character1Y = map(mouseY, 0, height, 400, 800);
  image(character.soulSparkles, character.character1X, character.character1Y);
  pop();

  //Soul
  push();
  if (bg.transparency >= 255){
    noStroke();
    fill(yellow.r, yellow.g, yellow.b, 100);
    //Noise x movement
    soul.vxCave += 0.01;
    soul.xCave = noise(soul.vxCave) * width;
    //Set the position for the current ellipse
    let current = frameCount % numSoulTrace;
    pastSoulX[current] = soul.xCave;
    pastSoulY[current] = mouseY;
    //Set the trail of ellipses and their size variation
    for (let i = 0; i < numSoulTrace; i++) {
      // which+1 is the smallest (the oldest in the array)
      let index = (current + 1 + i) % numSoulTrace; //witty equation taken from p5 library at https://p5js.org/examples/input-storing-input.html
      ellipse(pastSoulX[index], pastSoulY[index], i, i);
    }
  }
  pop();

  // Dialog text
  push();
  if (bg.transparency >= 255) {
    image(dialogBox, 0, 0, width, height);
    let dialogCave = lineCave[currentLine];
    textFont(poiretRegular);
    textSize(32);
    text(dialogCave, width/2, height*7/8 );
  }
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

  // Call the soul function to make to move
  soulControl();

  // Display trigger button for maze rotation
  push();
  fill(yellow.r, yellow.g, yellow.b);
  ellipse(rotationButton.x, rotationButton.y, rotationButton.size);
  pop();

  // display the maze
  for (let i = 0; i < mazeBlocks.length; i++) {
    let mazeblock = mazeBlocks[i];
    mazeblock.display();
    mazeblock.collision();
    mazeblock.parallax();

    // check if the player(soul) collides with walls of the rectangles and trigger transparency changes
    if (soulTouchesMaze) {
      soul.collisionTiming = 1000;
      soul.blockedDirection = soul.direction;
      if (soul.blockedDirection === `up`) {
        soul.y += (soul.vy *5);
      }
      if (soul.blockedDirection === `down`) {
        soul.y += (-soul.vy *5);
      }
      if (soul.blockedDirection === `left`) {
        soul.x += (soul.vx *5);
      }
      if (soul.blockedDirection === `right`) {
        soul.x += (-soul.vx *5);
      }
      console.log(mazeblock.alpha);
      mazeblock.opacity();
      bgm.collision.play();
    }
    else if (!soulTouchesMaze) {
      soul.collisionTiming += -1;
    }

  if (soul.collisionTiming <= 0) {
    soul.collisionTiming = 0;
    soul.blockedDirection = ``;
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

  // Display the clue Buttons
  for (let i=0; i < clueButtons.length; i++) {
    let clueButton = clueButtons[i];
    clueButton.display();
    clueButton.parallax();

    // Check if the player (soul) touches the clue button and trigger clue narratives
    let dTriggerClue = dist(clueButton.x, clueButton.y, soul.x, soul.y);
    if (dTriggerClue <= clueButton.size/2 + soul.size/2 && currentClue === i) {
      state = clueButton.state;
      if (currentClue <4) {
        currentClue ++;
      }
      // Placing the player(soul) in the previews position 
      if(soul.x <= clueButton.x) {
        soul.x += -soul.vx*2;
      }
      else if(soul.x >= clueButton.x) {
        soul.x += soul.vx*2;
      }
      if(soul.y <= clueButton.y) {
        soul.y += -soul.vy*2;
      }
      else if(soul.y >= clueButton.y) {
        soul.y += soul.vy*2;
      }
    }
    else if (dTriggerClue <= clueButton.size/2 + soul.size/2 && currentClue !== i) {
      state = 'wrongClue';
      // Placing the player(soul) in the previews position 
      if(soul.x <= clueButton.x) {
        soul.x += -soul.vx*2;
      }
      else if(soul.x >= clueButton.x) {
        soul.x += soul.vx*2;
      }
      if(soul.y <= clueButton.y) {
        soul.y += -soul.vy*2;
      }
      else if(soul.y >= clueButton.y) {
        soul.y += soul.vy*2;
      }
    }
  }
  // All and each of the clues are viewed?
  if (clues[0].clueViewed && clues[1].clueViewed && clues[2].clueViewed && clues[3].clueViewed && clues[4].clueViewed) {
    state = 'ending';
  }
}


// The soul exit the maze and sees itself again in its dear country. She remembers who she is (the princess), and flies to the sky. Her sad tears became the rain pouring  on Er Hai
function ending(){
  background(0);
  fill(white.r, white.g, white.b);

  // Background images and characters
  push();
  imageMode(CENTER);
  if (bg.transparency < 255){
    fadeIn();
  }
  bg.x = map(mouseX, 0, width, 700, width-700);
  bg.y = map(mouseY, 0, height, 200, height-200);
  image(bg.cave, bg.x, bg.y,);

  //Sparkles
  character.character1X = map(mouseX, 0, width, 400, 600);
  character.character1Y = map(mouseY, 0, height, 400, 800);
  image(character.soulSparkles, character.character1X, character.character1Y);
  pop();

  //Soul
  push();
  if (bg.transparency >= 255){
    noStroke();
    fill(yellow.r, yellow.g, yellow.b, 100);
    //Noise x movement
    soul.vxCave += 0.01;
    soul.xCave = noise(soul.vxCave) * width;
    //Set the position for the current ellipse
    let current = frameCount % numSoulTrace;
    pastSoulX[current] = soul.xCave;
    pastSoulY[current] = mouseY;
    //Set the trail of ellipses and their size variation
    for (let i = 0; i < numSoulTrace; i++) {
      // which+1 is the smallest (the oldest in the array)
      let index = (current + 1 + i) % numSoulTrace; //witty equation taken from p5 library at https://p5js.org/examples/input-storing-input.html
      ellipse(pastSoulX[index], pastSoulY[index], i, i);
    }
  }
  pop();

  // Dialog text
  push();
  image(dialogBox, 0, 0, width, height);
  let dialogEnding1 = lineEnding1[currentLine];
  textFont(poiretRegular);
  textSize(32);
  textAlign(CENTER);
  text(dialogEnding1, width/2, height*7/8 );
  pop();

  if (currentLine === lineClue5.length) {
    state = 'narrative';
  } 
}

// The real legend is written.
function narrative(){
  background(purple.r, purple.g, purple.b);
  fill(255);
  textAlign(CENTER);
  currentClue = 0;

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

// The state that is displayed when the clue should not be triggered yet.
function wrongClue(){
  background(0);
  fill(255);
  textAlign(CENTER);

  push();
  imageMode(CENTER);
  if (bg.transparency < 255){
    fadeIn();
  }
  bg.x = map(mouseX, 0, width, 700, width-700);
  bg.y = map(mouseY, 0, height, 200, height-200);
  image(bg.wrongClue, bg.x, bg.y,);
  pop();

  // Paragraph
  // Dialog text
  push();
  if (bg.transparency >= 255) {
    image(dialogBox, 0, 0, width, height);
    let dialogWrongClue = lineWrongClue[currentLine];
    textFont(poiretRegular);
    textSize(32);
    text(dialogWrongClue, width/2, height*7/8 );
  }
  pop();

  if (currentLine === lineWrongClue.length) {
    state = 'maze'; //when the dialog finishes go to the next state
  }
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function soulControl() {
  // Player (soul) settings
  push();
  fill(yellow.r, yellow.g, yellow.b, 100);
  let current = frameCount % numSoulTrace; //witty equation taken from p5 library at https://p5js.org/examples/input-storing-input.html
  pastSoulX[current] = soul.x;
  pastSoulY[current] = soul.y;
  for (let i = 0; i < numSoulTrace; i++) {
    // current+1 is the smallest (the oldest in the array)
    let index = (current + 1 + i) % numSoulTrace; //witty equation taken from p5 library at https://p5js.org/examples/input-storing-input.html
    ellipse(pastSoulX[index], pastSoulY[index], i, i);
  }
  
  // Keyboard Command (awsd)
  //A
  if (keyIsDown(65) && soul.x > soul.size/2) {
    soul.x += -soul.vx;
    soul.direction = `left`;
  }
  //D
  if (keyIsDown(68) && soul.x < width - soul.size/2) {
    soul.x += soul.vx;
    soul.direction = `right`;
  }
  //S
  if (keyIsDown(83) && soul.y < height - soul.size/2) {
    soul.y += soul.vy;
    soul.direction = `down`;
  }
  //W
  if (keyIsDown(87) && soul.y > soul.size/2) {
    soul.y += -soul.vy;
    soul.direction = `up`;
  }
  pop();

  // Hint ellipse on player
  hint = new Hint();
  hint.direction(clueButtons[currentClue].x, clueButtons[currentClue].y);
  hint.display();
}

function mousePressed() {
  //start game
  if (state === 'title') {
    state = 'cave';
    bgm.story.loop();
  }
  
  // count the dialog length
  if (state === 'cave'|| 'clue1' || 'clue2' || 'clue3' || 'clue4' || 'clue5' || 'wrongClue') {
    currentLine = currentLine + 1;
  }
}

function fadeIn() {
  //background transparency fadeIn
  bg.transparency += 5;
  tint(255, bg.transparency);
  if (bg.transparency >= 256) {
    bg.transparency = 0;
  }
}

function fadeOut() {
  bg.transparency += -5;
  tint(255, bg.transparency);
}