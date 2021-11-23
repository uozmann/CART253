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