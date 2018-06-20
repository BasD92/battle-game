/// <reference path="gameobject.ts" />

class Player extends GameObject implements Subject {

  private behaviour: Behaviour;

  public observers: Observer[] = [];

  constructor(setX: number, setY: number) {
    super("player1");

    // Set height and width
    this.height = 50;
    this.width = 50;

    // Set x and y axis
    this.x = setX;
    this.y = setY;

    // Create Fast object
    this.behaviour = new Fast(this);

    // Keyboard event listener
    window.addEventListener("keydown", (e: KeyboardEvent) => this.pressKey(e));
  }

  // Push observers to array
  public subscribe(o: Observer): void {
    this.observers.push(o);
  }

  public unsubscribe(o: Observer): void {
    let index = this.observers.indexOf(o);
    this.observers.splice(index, 1);
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

  public update(): void {
    this.draw();

    // Update fast speed behaviour
    this.behaviour.update();
  }
}