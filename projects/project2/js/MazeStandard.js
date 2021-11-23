class MazeStandard {

    constructor(x, y, showFourth) {
      this.x = x;
      this.y = y;
      this.size = 30;
      this.longueur = 150; //for longer walls
      this.courteLongueur = 100; //for shorter walls
      this.fourthLongueur = 50;
      this.largeur = 10;
      this.alpha = 255;
      this.startMove = false;
      this.showFourthWall = showFourth;
    }

    move() {
      // open-up the walls
      this.longueur = lerp(this.longueur, 50, 0.05);
      if (this.longueur === 50) {
        this.startMove = false;
      }
    }

    collision() {
      // check if soul collides with the walls
      soulTouchesMaze = collideRectCircle(this.x, this.y, this.longueur, this.largeur, soul.x, soul.y, 20) || collideRectCircle(this.x, this.y, this.largeur, this.courteLongueur, soul.x, soul.y, 20) || collideRectCircle(this.x + this.longueur/2, this.y + this.courteLongueur/2, this.largeur, this.courteLongueur, soul.x, soul.y, 20) || collideRectCircle(this.x + -this.longueur/2, this.y + this.courteLongueur/2 + this.courteLongueur + -this.largeur, this.longueur, this.largeur, soul.x, soul.y, 20) || collideRectCircle(this.x + this.longueur + -this.largeur, this.y + this.courteLongueur/2, this.largeur, this.longueur, soul.x, soul.y, 20) || collideRectCircle(this.x + this.longueur + -this.largeur, this.y + this.courteLongueur/2 + this.longueur, this.courteLongueur, this.largeur, soul.x, soul.y, 20);
    }

    opacity() {
      // decrease opacity for when the soul touches the wall
      this.alpha += -100;
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