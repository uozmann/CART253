class Hint {
    constructor() {
    this.x = soul.x;
    this.y = soul.y;
    this.size = soul.size/2;
    this.angle = 0;
    }
  
    direction(clueX, clueY) {
      this.angle = atan2(clueY - this.y, clueX - this.x);
    };
  
    display() {
      push();
      translate(this.x, this.y);
      rotate(this.angle);
      stroke(230, 0, 254);
      strokeWeight(4);
      fill(167, 0, 237);
      ellipse(this.size*2, 0, this.size / 2, this.size / 2);
      pop();
    };
  }