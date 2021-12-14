class Clue {

    constructor(id, lineClue, clueImageBg, clueImageCharacter1, clueImageCharacter2) {
      this.clueViewed = false;
      this.id = id;
      this.lineClue = lineClue;
      this.padding = 50;
      this.imageBg = clueImageBg; //background
      this.imageCharacter1 = clueImageCharacter1; //character 1
      this.imageCharacter2 = clueImageCharacter2; //character 2
    }
  
     // display the clue button in colour
    display() {
        background(purple.r, purple.g, purple.b);
        fill(255);
        this.clueViewed = true;

        // change music
        push();
        if (bgm.hasStarted === true) {
          bgm.hasStarted = false;
          bgm.maze.stop();
          bgm.clue.play();
        }
        pop();

        // display the background, characters and texts
        push();
        imageMode(CENTER);
        if (bg.transparency < 255){
          fadeIn();
        }
        bg.x = map(mouseX, 0, width, 700, width-700);
        bg.y = map(mouseY, 0, height, 200, height-200);
        image(this.imageBg, bg.x, bg.y, ); //Background Display

        if (bg.transparency >= 255) {
        character.character1X = map(mouseX, 0, width, 400, 600);
        character.character1Y = map(mouseY, 0, height, 600, 800);
        image(this.imageCharacter2, character.character1X, character.character1Y); //Character Display

        character.character2X = map(mouseX, 0, width, 1400, 1600);
        character.character2Y = map(mouseY, 0, height, 600, 800);
        image(this.imageCharacter1, character.character2X, character.character2Y); //Character Display
        }
        pop();

        // I'm gonna keep this for reference
        // push();
        // textFont(irishGroverRegular);
        // textSize(40);
        // text(`[Clue narratives ${this.id}]`, width / 2, height / 3);
        // pop();

      
        // Dialog text
        push();
        if (bg.transparency >= 255) {
          image(dialogBox, 0, 0, width, height);
          let dialogClue = this.lineClue[currentLine];
          textFont(poiretRegular);
          textSize(32);
          textAlign(CENTER);
          text(dialogClue, width/2, height*7/8 );
        }
        pop();
        
        // return to the maze when all lines are finished.
        if (currentLine === this.lineClue.length) {
          state = 'maze';
        }
  }
}