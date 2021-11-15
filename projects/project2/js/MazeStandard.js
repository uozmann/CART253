class MazeStandard {

    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = 30;
      this.longueur = 150; //for longer walls
      this.courteLongueur = 100; //for shorter walls
      this.largeur = 10;
      this.alpha = 255;
    }

    move() {
      // open-up the walls
      this.x + 50;
      this.y + -10;
      this.longueur = 50;
      this.courteLongueur = 100;
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
      pop();
    }
  }