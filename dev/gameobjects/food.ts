/// <reference path="gameobject.ts" />

class Food extends GameObject {

  constructor() {
    super("food");

    // Set height and width
    this.height = 50;
    this.width = 50;

    // Set random x and y axis
    this.x = Math.random() * (window.innerWidth - this.width);
    this.y = Math.random() * (window.innerHeight - this.height);
  }

  public update(): void {
    this.draw();
  }
}