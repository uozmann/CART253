class MazeStandard {

    constructor(x, y, showFourth) {
      this.x = x;
      this.y = y;
      this.startX = x;
      this.startY = y;
      this.size = 90;
      this.longueur = 450; //for longer walls
      this.startLongueur = 450;
      this.courteLongueur = 300; //for shorter walls
      this.fourthLongueur = 150; //for a fourthwall that appears on random blocks of the maze
      this.largeur = 40;
      this.alpha = 255;
      this.changeAlpha = true;
      this.parallaxRatio = 1.1; //parallax movement
      this.a = 0;
      this.startMove = false; //for morph effect
      this.showFourthWall = showFourth;  
    }

    move() {
      // open-up the walls
      this.longueur = lerp(this.longueur, 50, 0.05);
      if (this.longueur === 50) {
        this.startMove = false;
      }
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

    collision() {
      // check if soul collides with the walls
      soulTouchesMaze = collideRectCircle(this.x, this.y, this.longueur, this.largeur, soul.x, soul.y, 20) || collideRectCircle(this.x, this.y, this.largeur, this.courteLongueur, soul.x, soul.y, 20) || collideRectCircle(this.x + this.longueur/2, this.y + this.courteLongueur/2, this.largeur, this.courteLongueur, soul.x, soul.y, 20) || collideRectCircle(this.x + -this.longueur/2, this.y + this.courteLongueur/2 + this.courteLongueur + -this.largeur, this.longueur, this.largeur, soul.x, soul.y, 20) || collideRectCircle(this.x + this.longueur + -this.largeur, this.y + this.courteLongueur/2, this.largeur, this.longueur, soul.x, soul.y, 20) || collideRectCircle(this.x + this.longueur + -this.largeur, this.y + this.courteLongueur/2 + this.longueur, this.courteLongueur, this.largeur, soul.x, soul.y, 20);
    }

    opacity() {
      // decrease opacity for when the soul touches the wall
      if (this.changeAlpha === true) {
        this.alpha += -50;
      }
    }


  
    // display() the L-shaped walls
    display() {
      fill(purple.r, purple.g, purple.b, this.alpha);
      noStroke();

      push();
      // first L shape
      rect(this.x, this.y, this.longueur, this.largeur);
      rect(this.x, this.y, this.largeur, this.courteLongueur);
      // second L shape
      rect(this.x + this.longueur/2, this.y + this.courteLongueur/2, this.largeur, this.courteLongueur);
      rect(this.x + -this.longueur/2, this.y + this.courteLongueur/2 + this.courteLongueur + -this.largeur, this.longueur, this.largeur);
      // third L shape
      rect(this.x + this.longueur + -this.largeur, this.y + this.courteLongueur/2, this.largeur, this.longueur);
      rect(this.x + this.longueur + -this.largeur, this.y + this.courteLongueur/2 + this.longueur, this.courteLongueur, this.largeur);
      // forth ramdon wall
      if (this.showFourthWall === true) {
        rect(this.x + this.longueur + -this.largeur + this.courteLongueur, this.y + this.courteLongueur/2 + this.longueur, this.largeur, this.fourthLongueur);
      }
      pop();
    }
  }