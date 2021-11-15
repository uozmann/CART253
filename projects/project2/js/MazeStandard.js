class MazeStandard {

    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = 30;
      this.longueur = 150;
      this.courteLongueur = 100;
      this.largeur = 10;
      this.alpha = 255;
    }

    move() {
      this.x + 50;
      this.y + -10;
      this.longueur = 50;
      this.courteLongueur = 100;
    }

    collision() {
      soulTouchesMaze = collideRectCircle(this.x, this.y, this.longueur, this.largeur, soul.x, soul.y, 20) || collideRectCircle(this.x, this.y, this.largeur, this.courteLongueur, soul.x, soul.y, 20) || collideRectCircle(this.x + this.longueur/2, this.y + this.courteLongueur/2, this.largeur, this.courteLongueur, soul.x, soul.y, 20) || collideRectCircle(this.x + -this.longueur/2, this.y + this.courteLongueur/2 + this.courteLongueur + -this.largeur, this.longueur, this.largeur, soul.x, soul.y, 20) || collideRectCircle(this.x + this.longueur + -this.largeur, this.y + this.courteLongueur/2, this.largeur, this.longueur, soul.x, soul.y, 20) || collideRectCircle(this.x + this.longueur + -this.largeur, this.y + this.courteLongueur/2 + this.longueur, this.courteLongueur, this.largeur, soul.x, soul.y, 20);
    }

    opacity() {
      this.alpha += -100;
    }


  
    // display() the L shapes
    display() {
     
      push();

      fill(purple.r, purple.g, purple.b, this.alpha);
      noStroke();
      rect(this.x, this.y, this.longueur, this.largeur);
      pop();
  
      // Body
      push();
      fill(purple.r, purple.g, purple.b, this.alpha);
      noStroke();
      rect(this.x, this.y, this.largeur, this.courteLongueur);
      pop();
  
      // Eyes
      push();
      fill(purple.r, purple.g, purple.b, this.alpha);
      noStroke();
      rect(this.x + this.longueur/2, this.y + this.courteLongueur/2, this.largeur, this.courteLongueur);
      rect(this.x + -this.longueur/2, this.y + this.courteLongueur/2 + this.courteLongueur + -this.largeur, this.longueur, this.largeur);

      rect(this.x + this.longueur + -this.largeur, this.y + this.courteLongueur/2, this.largeur, this.longueur);
      rect(this.x + this.longueur + -this.largeur, this.y + this.courteLongueur/2 + this.longueur, this.courteLongueur, this.largeur);
      pop();
    }
  }