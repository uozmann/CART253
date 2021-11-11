class MazeBlock {

    constructor(x, y) {
      this.x = x; 
      this.y = y; 
      this.width = 100;
      this.shortWidth = 50;
      this.height = 10;
      this.rotation = 90;
      this.blockWidth = this.width + this.shortWidth - this.height + this.shortWidth;
      this.blockHeight = this.width + this.shortWidth
    }
  
    rotate() {
      translate(this.blockWidth, this.blockHeight);
      rotate(this.rotation);
    }
  
     //One block of labyrinth
    display() {
      push();
      fill(0);
      noStroke();
      // One L shape
      rect(this.x,this.y, this.width,this.height);
      rect(this.x,this.y, this.height,this.shortWidth);

      // One reversed L shape
      rect(this.x - this.x, this.shortWidth*2 - this.height, this.width, this.height);
      rect(this.shortWidth*2 - this.height, this.shortWidth, this.height, this.shortWidth);
      
      // One rotated L shape
      rect(this.width + this.shortWidth - this.height, this.shortWidth, this.height, this.width);
      rect(this.width + this.shortWidth - this.height,this.width + this.shortWidth - this.height, this.shortWidth, this.height);
      pop();
    }
  }