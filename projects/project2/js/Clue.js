class Clue {

    constructor(id, lineClue) {
      this.clueViewed = false;
      this.id = id;
      this.lineClue = lineClue;
    }
  
     // display the clue button in colour
    display() {
        background(purple.r, purple.g, purple.b);
        fill(255);
        this.clueViewed = true;

        push();
        imageMode(CENTER);
        bg.x = map(mouseX, 0, width, 700, width-700);
        bg.y = map(mouseY, 0, height, 200, height-200);
        image(bg.palace, bg.x, bg.y, );

        character.princessX = map(mouseX, 0, width, 1400, 1600);
        character.princessY = map(mouseY, 0, height, 600, 800);
        image(character.princess, character.princessX, character.princessY);

        character.manX = map(mouseX, 0, width, 400, 600);
        character.manY = map(mouseY, 0, height, 600, 800);
        image(character.man, character.manX, character.manY);
        pop();
      
        push();
        textFont(irishGroverRegular);
        textSize(40);
        text(`[Clue narratives ${this.id}]`, width / 2, height / 3);
        pop();

      
        // Dialog text
        push();
        image(dialogBox, 0, 0, width, height);
        let dialogClue = this.lineClue[currentLine];
        textFont(poiretRegular);
        textSize(32);-
        text(dialogClue, width/2, height*7/8 );
        pop();
      
        if (currentLine === this.lineClue.length) {
          state = 'maze';
        }
  }
}