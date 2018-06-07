/// <reference path="gameobject.ts" />

class Player extends GameObject {

  private bullet: Bullet;
  private bullets: Array<Bullet> = new Array();
  private shoot: number = 0;
  private behaviour: Behaviour;

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
    //this.speed = 1;

    // Create bullet object
    this.bullet = new Bullet(this.x, this.y);

    // Create Fast object
    this.behaviour = new Fast(this);

    // Keyboard event listener
    window.addEventListener("keydown", (e: KeyboardEvent) => this.pressKey(e));
  }

  private pressKey(e: KeyboardEvent): void {
    switch (e.keyCode) {
      case 38: // Up arrow
        this.y -= this.speed;
        break;
      case 40: // Down arrow
        this.y += this.speed;
        break;
      case 37: // Left arrow
        this.x -= this.speed;
        break;
      case 39: // Right arrow
        this.x += this.speed;
        break;
      case 32: // Space bar
        this.shoot = 1;
        break;
    }
  }

  public update(): void {
    //console.log(this.x);
    this.objectElement.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    this.objectElement.style.height = this.height + "px";
    this.objectElement.style.width = this.width + "px";

    if (this.x == window.innerWidth - this.width) {

    }

    if (this.shoot == 1) {
      //console.log("Shoot!");
      this.bullet.update();
    }

    // Update fast speed behaviour
    this.behaviour.update();
  }

  // Rectangle of Player
  public getRectangle() {
    return this.objectElement.getBoundingClientRect();
  }
}