/// <reference path="gameobject.ts" />

class Player extends GameObject {

  public speed: number;

  constructor(nameElement: string, setX: number, setY: number) {
    super();

    // Append player element to document
    this.objectElement = document.createElement(nameElement);
    document.body.appendChild(this.objectElement);

    // Set x and y axis
    this.x = setX;
    this.y = setY;

    // Set height and width
    this.height = 50;
    this.width = 50;

    // Set speed
    this.speed = 4;

    // Keyboard event listener
    window.addEventListener("keydown", (e: KeyboardEvent) => this.pressKey(e));
  }

  private pressKey(e: KeyboardEvent): void {
    switch (e.keyCode) {
      case 38: // Up arrow
        console.log("Up arrow key was pressed!");
        this.y -= this.speed;
        break;
      case 40: // Down arrow
        console.log("Down arrow key was pressed!");
        this.y += this.speed;
        break;
      case 37: // Left arrow
        console.log("Left arrow key was pressed!");
        this.x -= this.speed;
        break;
      case 39: // Right arrow
        console.log("Right arrow key was pressed!");
        this.x += this.speed;
        break;
    }
  }

  public update(): void {
    this.objectElement.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    this.objectElement.style.height = this.height + "px";
    this.objectElement.style.width = this.width + "px";
  }
}