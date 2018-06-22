class GameObject {

  public objectElement: HTMLElement;
  public x: number;
  public y: number;
  public height: number;
  public width: number;
  public speed: number;
  public container: HTMLElement;
  public behaviour: Behaviour;

  constructor(nameElement:string) {
    // Append element to container
    this.objectElement = document.createElement(nameElement);
    this.container = document.getElementById('container');
    this.container.appendChild(this.objectElement);
  }

  // Update method (Override in child)
  public update(): void {

  }

  // Draw object element
  public draw(): void {
    this.objectElement.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    this.objectElement.style.height = this.height + "px";
    this.objectElement.style.width = this.width + "px";
  }

  // Get rectangle of object
  public getRectangle(): ClientRect {
    return this.objectElement.getBoundingClientRect();
  }

  // Remove element from DOM
  public remove(): void {
    this.objectElement.remove();
  }
}