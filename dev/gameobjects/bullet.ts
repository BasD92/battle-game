/// <reference path="gameobject.ts" />

class Bullet extends GameObject {

  constructor(setX: number, setY: number) {
    super();

    // Append bullet element to document
    this.objectElement = document.createElement("bullet");
    document.body.appendChild(this.objectElement);

    // Set height and width
    this.height = 30;
    this.width = 30;

    // Get x en y from Player
    this.x = setX;
    this.y = setY;

    // Set speed
    this.speed = 10;
  }

  public update() {
    this.x += this.speed;
    this.draw();
  }
}