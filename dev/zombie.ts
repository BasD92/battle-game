/// <reference path="gameobject.ts" />

class Zombie extends GameObject {

  public speed: number;

  constructor() {
    super();

    // Append zombie element to document
    this.objectElement = document.createElement("zombie");
    document.body.appendChild(this.objectElement);

    // Set height and width
    this.height = 70;
    this.width = 70;

    // Set random x and y axis
    this.x = Math.random() * (window.innerWidth - this.width);
    this.y = Math.random() * (window.innerHeight - this.height);

    // Set speed
    this.speed = 4;
  }

  public update(): void {
    //this.y += this.speed;
    this.objectElement.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    this.objectElement.style.height = this.height + "px";
    this.objectElement.style.width = this.width + "px";
  }
}