/// <reference path="gameobject.ts" />

class Player extends GameObject implements Subject {

  public life: number = 2;
  private behaviour: Behaviour;

  public observers: Observer[] = [];

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

    // Create Fast object
    this.behaviour = new Fast(this);

    // Keyboard event listener
    window.addEventListener("keydown", (e: KeyboardEvent) => this.pressKey(e));
  }

  // Push observers to array
  public subscribe(o: Observer): void {
    this.observers.push(o);
  }

  // Notify observers
  public strongerPlayer(): void {
    for (let o of this.observers) {
      o.notify("Player is eating food and is stronger now. Zombies are more afraid of the player and shrink");
    }
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
    }
  }

  // Lives of player on screen
  public displayLives() {
    document.getElementById('life').innerHTML = "Lives: " + this.life;
  }

  public update(): void {
    this.draw();
    this.displayLives();

    // Update fast speed behaviour
    this.behaviour.update();
  }
}