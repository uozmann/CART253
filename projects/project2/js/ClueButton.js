class ClueButton {

    constructor(x, y, state, clueImage) {
      this.x = x; 
      this.y = y; 
      this.size = 300;
      this.state = state;
      this.image = clueImage;
      this.parallaxRatio = 1.1;
    }

    parallax() {
      //Moving the maze according to player's position
        if (keyIsDown(65)) {
          this.x += soul.vx*this.parallaxRatio;
        }
        if (keyIsDown(68)) {
          this.x += -soul.vx*this.parallaxRatio;
        }
        if (keyIsDown(83)) {
          this.y += -soul.vy*this.parallaxRatio;
        }
        if (keyIsDown(87)) {
          this.y += soul.vy*this.parallaxRatio;
        }
    }
  
     // display the clue button in colour
    display() {
      push();
      noFill();
      imageMode(CENTER);

      // Button shape
      ellipse(this.x, this.y, this.size);
      image(this.image, this.x, this.y, this.size, this.size);
      pop();
    }
  }