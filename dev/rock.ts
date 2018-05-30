/// <reference path="gameobject.ts" />

class Rock extends GameObject {

  constructor() {
    super();
  }

  public update(): void {
    this.objectElement.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    this.objectElement.style.height = this.height + "px";
    this.objectElement.style.width = this.width + "px";
  }
}