/// <reference path="gameobject.ts" />

class Food extends GameObject {

  constructor() {
    super();

    // Append food element to document
    this.objectElement = document.createElement("food");
    document.body.appendChild(this.objectElement);

    // Set height and width
    this.height = 50;
    this.width = 50;

    // Set random x and y axis
    this.x = Math.random() * (window.innerWidth - this.width);
    this.y = Math.random() * (window.innerHeight - this.height);
  }

  public update(): void {
    this.objectElement.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    this.objectElement.style.height = this.height + "px";
    this.objectElement.style.width = this.width + "px";
  }

  public getRectangle() {
    // Rectangle of food
    return this.objectElement.getBoundingClientRect();
  }

  public remove() {
    // Remove element from DOM
    this.objectElement.remove();
  }
}