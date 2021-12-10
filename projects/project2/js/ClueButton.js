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
        //A
        if (keyIsDown(65) && soul.x > soul.size/2 && soul.blockedDirection !== `left`) { 
          this.x += soul.vx*this.parallaxRatio;
        }
        //D
        if (keyIsDown(68) && soul.x < width - soul.size/2 && soul.blockedDirection !== `right`) { 
          this.x += -soul.vx*this.parallaxRatio;
        }
        //S
        if (keyIsDown(83) && soul.y < height - soul.size/2 && soul.blockedDirection !== `down`) {
          this.y += -soul.vy*this.parallaxRatio;
        }
        //W
        if (keyIsDown(87) && soul.y > soul.size/2 && soul.blockedDirection !== `up`) {
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