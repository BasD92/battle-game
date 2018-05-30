/// <reference path="gameobject.ts" />

class Bullet extends GameObject {

  public speed: number;

  constructor(setX: number, setY: number) {
    super();

    // Append bullet element to document
    this.objectElement = document.createElement("bullet");
    document.body.appendChild(this.objectElement);

    // Set height and width
    this.height = 30;
    this.width = 30;

    // Set x and y axis
    this.x = setX;
    this.y = setY;

    // Set speed
    this.speed = 4;
  }

  public update(): void {
    console.log(this.x += this.speed);
    this.objectElement.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    this.objectElement.style.height = this.height + "px";
    this.objectElement.style.width = this.width + "px";
  }
}