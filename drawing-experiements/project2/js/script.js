// Prototype Project 2: The maze
// Man Zou

// Instructions
// When in narration phase, simply mouse click to go through the storyline
// When in the maze, use "awsd" to move; the smaller yellow circle will open the maze so it is easier to move across; the bigger grey circle are clues to pursue the storyline.

// Sources
// Codes come from CART253's course content and Pippin, p5 Library, consultation with Computational Lab and my own exploration
// All visuals come from myself
// Sounds come from the open-source platform Aigei.com
// Detailed Attributions: 
// 1. Pippin and CART 253: clue states(line 556), input box(line 896-914).
// 2. Sabine: perfected maze rotations(in the MazeStandart Class, line 24), help combine repeating functions for the clues into a class (in the Clue class, line 3-6), collision with maze walls (line 503-514 (added the soul.blockeddirection and soul.direction)), added currentclue inside brakets (line 819).
// 3. P5 Js: Size decreasing per frame for the trail of the soul (line 420 - 423), angle around a circle equation (in the Hint Class, line 10-12).

// States functions
// title(); cave(); maze(); clue1(); clue2(); clue3(); clue4(); clue5(); wrongClue(); ending(); ending2(); narrative();


"use strict";

// Fonts
let irishGroverRegular;
let cairoRegular;
let caveatRegular;
let poiretRegular;

// Images
//Background Images
let bg = {
  cover: undefined,
  cave: undefined,
  palace: undefined,
  mountain: undefined,
  monastere: undefined,
  caveSky: undefined,
  erhai: undefined,
  wrongClue: undefined,
  village: undefined,
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
// Image for the instruction state
let instruction = {
  x: undefined,
  y: undefined,
}

// Background Music
let bgm = {
  story: undefined,
  maze: undefined,
  collision: undefined,
  clue: undefined,
  wrongClue: undefined,
  hasStarted: false,
}

//Texts
//Narrative dialog box
let dialogBox = {
  x: undefined,
  y: undefined,
  padding: 30,
}

// Story text arrays
let lineCave = [`Where am I...(click to continue)`, `I can’t seem to remember anything, am I in a cave?`, `Is this a skeleton in front of me? Who is it?...And who am I? What am I?`, `I seem to be a ball of light...my mind starts to hurt...`, `Wait...I start to see a maze, it’s in my mind, this is so strange... Really really strange...`,];
let lineClue1 = [`This is the beginning of a romance story.`, `Once upon a time, a poor young man living in the mountains received a magical gift, that can make him transform into any bird.`, `So he became an eagle, and flew to the royal palace. Never has he seen such a splendid garden, and inside the garden 
was a princess, so beautiful that he cannot take his eyes elsewhere.`, `He knows however, that the king would never allow a poor man like him, to marry his precious daughter.`, `But the princess was so beautiful, so beautiful that he cannot forget.`, `So, secretly he meets with the princess, in her garden, and love has been created.`,];
let lineClue2 = [`Shortly, the young man could not bear anymore to enter the garden like a thief, he wants more.`, `One day, he decided to set an end to their secret meetings.`, `So he transformed into a bird, and carried the princess to the mountain he used to live.`, `The mountain was cold, and covered by snow. There was no one.`, `On the top of the mountain was a cave, that one can only reach by flying. He settled the princess in this cave.`, `The young man was happy, because no one could ever find this place, and no one could disturb their love anymore.`,];
let lineClue3 = [`In the palace, all know that the king is not well.`, `He could not sleep, so much he worries for his poor daughter who disappeared suddenly, leaving no trace.`, `His counselors referred the king to the priest, who is known to be a powerful magician. The king then went to 
the temple and asked for his help.`, `Upon a detailed inquiry, the priest concluded that a magical being, like him, has taken the princess away.`, `Learning this, he promised the king to capture the culprit.`,];
let lineClue4 = [`The snow mountain was so cold…and the princess has nothing but the dress she wore in her garden.`, `Her feet are frozen, her hands are stiff, the weather was unbearable.`, `So she begged the man to bring her precious coat, that can protect her from the hardest cold.`, `The man does not want her to die, so he transformed into a bird, and flew to the palace.`,];
let lineClue5 = [`In his way awaits the priest, who settled a trap to capture the young man.`, `Miracle did not happen, and the young man has been caught.`, `The priest then petrified him without mercy and threw the statue of the young man into the lake Erhai.`, `Having accomplished his promise, the priest disappeared. No one can find him anymore.`, `The king searched for his daughter, for days, for months, for year…But nothing has been found.`,];
let lineWrongClue = [`I hear voices...Where am I?`, `Ah my head hurts! I should get out of here.`,];
let lineEnding1 = [`Suddenly, the maze in my mind disappeared again.`, `In front of me was the skeleton of an unknown person. It’s still the same cave…`, `All those scenes I have seen… Are they real?`, `Are they…perhaps…people’s memories?`, `If so…`, `I think I know who this skeleton is.`, `it's...`];
let lineEnding2 = [`And suddenly the cave disappeared, I see Erhai below me, I see my country. And I remembered everything.`, `My death, my sorrow, my anger…all masked inside lies. I remember…`, `How I have been carried to this cave against my will, isolated until death for the “love” that the man claimed for me.`, `And the priest…gifted with such powerful magic that he chooses to kill, but neglects a life that he could save.`, `Is it human nature? Is it a sad coincidence?`, `I feel tired and lighter, as dust carried by the wind, maybe it is my final end?`, `Then, with my last effort, I searched for the palace, because I remembered…`, `That I never had the chance to tell my farewell to my dear father.`, `…`];
let currentLine = 0;

// Ending Text Input Box
let endingChoice = {
  line: ``,
  x: undefined,
  y: undefined,
  choiceBox: undefined, //image for the input box
  padding: -30,
  longueur: 450,
  largeur: 80,
  entry: false, //set the entry to false at first
}

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
  image: undefined,
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

// Purple hint ellipse on the soul (player)
let hint;


// Loading images and text font
function preload() {
  irishGroverRegular = loadFont(`assets/fonts/Irish Grover/IrishGrover-Regular.ttf`); 
  cairoRegular = loadFont(`assets/fonts/Cairo/Cairo-Regular.ttf`);
  caveatRegular = loadFont(`assets/fonts/Caveat/Caveat-Regular.ttf`); 
  poiretRegular = loadFont(`assets/fonts/Poiret/PoiretOne-Regular.ttf`); 
  bg.cover = loadImage(`assets/images/bgcover.jpg`);
  bg.cave = loadImage(`assets/images/bgcave.jpg`);
  bg.palace = loadImage(`assets/images/bgpalace.jpg`);
  bg.mountain = loadImage(`assets/images/bgmountain.jpg`);
  bg.monastere = loadImage(`assets/images/bgmonastere.jpg`);
  bg.caveSky = loadImage(`assets/images/bgcaveandsky.jpg`);
  bg.erhai = loadImage(`assets/images/bgerhai.jpg`);
  bg.wrongClue = loadImage(`assets/images/bgwrongclue.jpg`);
  bg.village = loadImage(`assets/images/bgvillage.jpg`);
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
  rotationButton.image = loadImage(`assets/images/rotationtrigger.png`);
  dialogBox = loadImage(`assets/images/ui_dialogbox.png`); 
  instruction = loadImage(`assets/images/ui_instructions.png`); 
  endingChoice.choiceBox = loadImage(`assets/images/ui_choiceinput.png`); 
  bgm.story = loadSound(`assets/sounds/bgm_magicforest.mp3`); 
  bgm.maze = loadSound(`assets/sounds/bgm_maze.mp3`);
  bgm.clue = loadSound(`assets/sounds/bgm_traditional.mp3`);
  bgm.wrongClue = loadSound(`assets/sounds/bgm_wrongclue.mp3`); 
  bgm.collision = loadSound(`assets/sounds/bgm_collision.mp3`);
}


function setup() {
  createCanvas(windowWidth,windowHeight);
  console.log(windowWidth)
  if(windowWidth < 1000) {
    bg.cave.resize(bg.cave.width*2/3,0);
  }
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

  case `mazeInstruction`:
    mazeInstruction();
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

  case `ending2`:
    ending2();
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

  // Cover Image
  push();
  image(bg.cover, 0, 0, width, height);
  pop();

  // Header
  push();
  textFont(irishGroverRegular);
  textSize(200);
  text(`The Maze`, width / 2, height / 3);
  pop();

  // Paragraph
  push();
  textFont(irishGroverRegular);
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
  bg.x = map(mouseX, 0, width, bg.cave.width/3, width-bg.cave.width/3); // Mousing effect on the images
  bg.y = map(mouseY, 0, height, bg.cave.height/7, height-bg.cave.height/7);
  image(bg.cave, bg.x, bg.y,);

  //Sparkles
  character.character1X = map(mouseX, 0, width, width/4, width/3); // Mousing effect on the characters
  character.character1Y = map(mouseY, 0, height, height/3, height/2);
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
    image(dialogBox, 0, 0, width, height); //dialog box
    let dialogCave = lineCave[currentLine];
    textFont(poiretRegular);
    textSize(32);
    rectMode(CENTER);
    textAlign(CENTER);
    text(dialogCave, width/2, height*7/8); //dialof text
  }
  pop();

  if (currentLine === lineCave.length) {
    state = 'mazeInstruction'; //when the dialog finishes go to the next state
  }
}


//Instruction page for the maze
function mazeInstruction() {
  background(purple.r, purple.g, purple.b);
  fill(255);

  // Header
  push();
  textFont(irishGroverRegular);
  textSize(200);
  textAlign(CENTER, CENTER);
  text(`Instructions`, width / 2, height / 5);
  pop();

  // Paragraph
  push();
  textFont(poiretRegular);
  textSize(32);
  textAlign(CENTER, CENTER);
  text(`Press to Continue`, width/2, height / 3);
  pop();

  // Image
  push();
  textFont(poiretRegular);
  textSize(32);
  imageMode(CENTER);
  image(instruction, width/2, height*2/3, width*5/9, height/2);
  pop();
}


// The soul then tries to leave the cave and falls under a maze. The soul will need to find clues hinting at their identities.
function maze(){
  // Change music when at the maze
  if (bgm.hasStarted === false) {
    bgm.hasStarted = true;
    bgm.maze.loop();
    bgm.story.stop();
    bgm.clue.stop();
    bgm.wrongClue.stop();
  }
  background(0);
  noStroke();
  currentLine = 0; // Restart the current line for the next clue narratives

  // Call the soul function to make it move
  soulControl();

  // display the maze
  for (let i = 0; i < mazeBlocks.length; i++) {
    let mazeblock = mazeBlocks[i];
    mazeblock.display();
    mazeblock.collision(); //check collision
    mazeblock.parallax(); //parallax movement according to soul's position

    // check if the player(soul) collides with walls of the rectangles and trigger transparency changes
    if (soulTouchesMaze) {
      soul.collisionTiming = 1000; //timer needed, otherwise there will be some time differences and make it bug
      soul.blockedDirection = soul.direction; //prevent movement when collides with the maze walls
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
      // Decrease maze wall's opacity when touched
      mazeblock.opacity();
      bgm.collision.play();
    }
    else if (!soulTouchesMaze) {
      soul.collisionTiming += -1; //start timer
    }

  if (soul.collisionTiming <= 0) { //reset timer
    soul.collisionTiming = 0;
    soul.blockedDirection = ``; //reset value for blocked direction
  }

    
    // Check if the player (soul) touches the rotation button and trigger opening rotation of the maze walls
    let dTriggerRotation = dist(rotationButton.x, rotationButton.y, soul.x, soul.y);
    if (dTriggerRotation <= rotationButton.size/2 + soul.size/2) {
    mazeblock.startMove = true;
    }
    if (mazeblock.startMove === true) { 
      mazeblock.move(); // open-up the walls
    }
  }

  // Display trigger button for maze rotation
  push();
  fill(yellow.r, yellow.g, yellow.b);
  ellipse(rotationButton.x, rotationButton.y, rotationButton.size);
  imageMode(CENTER);
  image(rotationButton.image, rotationButton.x, rotationButton.y);
  pop();

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
        currentClue ++; //add a value for to close the clues seen, and to open up next clue.
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
    // If the player touches a clue that is not opened, then goes to the wrongClue state
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


// The soul returns back to the cave and guesses the identity of the skeleton
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

  // When all texts are displayed, call the input pannel
  if (currentLine >= lineEnding1.length) {
    choiceInput();
  } 
}


//The soul exit the maze and sees itself again in its dear country. She remembers who she is (the princess), and flies to the sky. Her sad tears became the rain pouring  on Er Hai
function ending2(){
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
  image(bg.village, bg.x, bg.y,);
  pop();

  // Dialog text
  push();
  image(dialogBox, 0, 0, width, height);
  let dialogEnding2 = lineEnding2[currentLine];
  textFont(poiretRegular);
  textSize(32);
  textAlign(CENTER);
  text(dialogEnding2, width/2, height*7/8 );
  pop();

  //Go to the next state
  if (currentLine === lineEnding2.length) {
    state = 'narrative'
  } 
}

// The real legend is written.
function narrative(){
  background(purple.r, purple.g, purple.b);
  fill(255);

  currentClue = 0;

  // Header
  push();
  textFont(irishGroverRegular);
  textSize(40);
  textAlign(CENTER);
  text(`The Real Legend (End)`, width / 2, height / 10);
  pop();

  // Paragraph
  push();
  textFont(poiretRegular);
  textSize(32);
  textAlign(CENTER);
  text(`
      The legend of Wang Fuyun is a widely known story in Dali. 
  In winter, on a cloudless and sunny day, suddenly a cloud as bright as silver and white as snow appeared on the Yuju Peak of 
  Cangshan Mountain. 

      The cloud displays clean and soft light across the deep blue sky.
  Then, unpredictably, it turns from white to black and raises higher and higher, and its figure became longer and longer, like a slender 
  woman with disheveled hair and a black funeral dress, as if looking down on the vast sea of Er and crying loudly. This is the legendary 
  Cloud of Eternal Sorrow. When the appears, no matter how good the weather is, there will be violent winds and sea waves in an 
  instant. 

      According to legend, this cloud is the incarnation of Princess Afeng of Nanzhao. She falls in love with a young hunter and together 
  they fleed to the mountain, living in a cave. Her father then invited a Buddhist priest, master Luo Quan, to search for the princess. The 
  mountain was too cold for the princess, so the man went into the palace looking for a coat. He found the magic coat of the priest that 
  can protect from any cold, but on his way to bring it back to the princess, he was petrified by the priest, becoming a stone in the sea 
  of Er. The princess died on the peak of Cangshan Yuju and her essence turned into a white cloud, angry, trying to blow the sea away 
  and see her lover. Therefore, later generations called this cloud of eternal sorrow.

      Of course, in reality, the appearance of this cloud is entirely caused by the high-speed airflow, and it is related to the special 
  geographical location of Cangshan and Erhai.`, width/2, height/2 );
  pop();
}

// The state that is displayed when the clue should not be triggered yet.
function wrongClue(){
  background(0);
  fill(255);
  textAlign(CENTER);

  push();
  // Change music
  if (bgm.hasStarted === true) {
    bgm.hasStarted = false;
    bgm.maze.stop();
    bgm.wrongClue.play();
  }
  pop();

  // Background Image
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

  // start maze
  if (state === 'mazeInstruction') {
    state = 'maze';
  }
  
  // count the dialog length
  if (state === 'cave'|| 'clue1' || 'clue2' || 'clue3' || 'clue4' || 'clue5' || 'wrongClue' || 'ending' || 'ending2') {
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
  //background fadeOut (optional)
  bg.transparency += -5;
  tint(255, bg.transparency);
  if (bg.transparency <= 0) {
    bg.transparency = 0;
  }
}

//Key input box for the ending
function choiceInput() {
  endingChoice.entry = true;

  push();
  // image
  imageMode(CENTER);
  image(endingChoice.choiceBox, width/2, height/3)
  rectMode(CENTER);

  // white input box
  fill(255);
  endingChoice.x = width/2;
  endingChoice.y = height/3;
  rect(endingChoice.x, endingChoice.y - endingChoice.padding, endingChoice.longueur, endingChoice.largeur);
  pop();

  // input text
  push();
  fill(purple.r, purple.g, purple.b);
  textAlign(CENTER, CENTER);
  textFont(irishGroverRegular);
  textSize(40);
  text(endingChoice.line, endingChoice.x, endingChoice.y - endingChoice.padding);
  pop();
}

//check answer for choiceInput()
function checkAnswer() {
  if(endingChoice.line === `PRINCESS`) {
    currentLine = 0;
    state = `ending2`;
  }
  else {
    state = `narrative`;
  }
}

//key typed in the ending
function keyTyped() {
  if (endingChoice.entry) {
    endingChoice.line += key;
  }
}

//command for corrections
function keyPressed() {
  if (endingChoice.entry) {
    if (keyCode === BACKSPACE) {
      // Remove the last character in a string!
      endingChoice.line = endingChoice.line.slice(0, endingChoice.line.length - 1);
    }
    else if (keyCode === ENTER) {
      checkAnswer();
    }
  }
}