class MazeStandard {

    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = 30;
      this.longueur = 150;
      this.courteLongueur = 100;
      this.largeur = 10;
    }

    rotate() {
      translate(width/2, height/2);
      rotate(this.rotation);
    }
  
    // display() draws our bee onto the canvas
    display() {
      push();
      // Wings on either side
      fill(purple.r, purple.g, purple.b);
      noStroke();
      rect(this.x, this.y, this.longueur, this.largeur);
      pop();
  
      // Body
      push();
      fill(purple.r, purple.g, purple.b);
      noStroke();
      rect(this.x, this.y, this.largeur, this.courteLongueur);
      pop();
  
      // Eyes
      push();
      fill(purple.r, purple.g, purple.b);
      noStroke();
      rect(this.x + this.longueur/2, this.y + this.courteLongueur/2, this.largeur, this.courteLongueur);
      rect(this.x + -this.longueur/2, this.y + this.courteLongueur/2 + this.courteLongueur + -this.largeur, this.longueur, this.largeur);

      rect(this.x + this.longueur + -this.largeur, this.y + this.courteLongueur/2, this.largeur, this.longueur);
      rect(this.x + this.longueur + -this.largeur, this.y + this.courteLongueur/2 + this.longueur, this.courteLongueur, this.largeur);
      pop();
    }
  }