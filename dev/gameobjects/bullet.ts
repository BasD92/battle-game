/// <reference path="gameobject.ts" />

class Bullet extends GameObject {

  constructor(setX: number, setY: number) {
    super("bullet");

    // Set height and width
    this.height = 30;
    this.width = 30;

    // Get x en y from Player
    this.x = setX;
    this.y = setY;

    // Set speed
    this.speed = 10;
  }

  public update(): void {
    this.x += this.speed;
    this.draw();
  }
}