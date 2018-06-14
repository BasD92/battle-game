/// <reference path="gameobject.ts" />

class Rock extends GameObject {

  constructor() {
    super();

    // Append rock element to document
    this.objectElement = document.createElement("rock");
    document.body.appendChild(this.objectElement);

    // Set height and width
    this.height = 60;
    this.width = 60;

    // Set random x and y axis
    this.x = Math.random() * (window.innerWidth - this.width);
    this.y = Math.random() * (window.innerHeight - this.height);
  }

  public update(): void {
    this.draw();
  }
}