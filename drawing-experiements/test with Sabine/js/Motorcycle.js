class Motorcycle extends Vehicle {
  constructor(x, y) {
    super(x, y);

    this.width = 30;
    this.height = 10;
    this.vx = 10;
  }

  display() {
    push();
    fill(255, 255, 0);
    super.display();
    pop();
  }
}