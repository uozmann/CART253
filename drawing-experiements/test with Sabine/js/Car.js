class Car extends Vehicle {
  constructor(x, y) {
    super(x, y);

    this.width = 50;
    this.height = 20;
    this.vx = 5;
  }

  display() {
    push();
    fill(255, 0, 0);
    super.display();
    pop();
  }
}