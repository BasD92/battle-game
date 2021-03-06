class Zombie implements Observer {

  public player: Subject;

  public objectElement: HTMLElement;
  public x: number;
  public y: number;
  public height: number;
  public width: number;
  public speed: number;
  public container: HTMLElement;

  constructor(nameElement:string) {
    // Append element to document
    this.objectElement = document.createElement(nameElement);
    this.container = document.getElementById('container');
    this.container.appendChild(this.objectElement);

    this.speed = 2;
  }

  // Update method (Override in child)
  public update(): void {

  }

  // Notification to all zombies
  public notify(): void {
    // All zombies are shrinking
    this.height -= 10;
    this.width -= 10;
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

  // Reset zombies on top of screen
  public reset(): void {
    this.x = Math.random() * (window.innerWidth - this.width);
    this.y = 0;
  }

  // Remove element from DOM
  public remove(): void {
    this.objectElement.remove();
  }
}