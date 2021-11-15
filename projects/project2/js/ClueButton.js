class ClueButton {

    constructor(x, y, state) {
      this.x = x; 
      this.y = y; 
      this.size = 100;
      this.state = state;
    }
  
     // display the clue button in colour
    display() {
      push();
      fill(grey.r, grey.g, grey.b);

      // Button shape
      this.x = constrain(this.x, this.size/2, width - this.size/2);
      this.y = constrain(this.y, this.size/2, height - this.size/2);
      ellipse(this.x, this.y, this.size);
      pop();
    }
  }