/// <reference path="gameobject.ts" />

class Player extends GameObject implements Subject {

  public observers: Observer[] = [];

  constructor(setX: number, setY: number) {
    super("player1");

    this.behaviour = new Running(this);

    // Set height and width
    this.height = 50;
    this.width = 50;

    // Set x and y axis
    this.x = setX;
    this.y = setY;

    // Set speed
    this.speed = 12;

    // Keyboard event listener
    window.addEventListener("keydown", (e: KeyboardEvent) => this.pressKey(e));
  }

  // Push observers to array
  public subscribe(o: Observer): void {
    this.observers.push(o);
  }

  // Remove observers from array
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
    this.behaviour.pressKey(e);
  }

  public update(): void {
    this.behaviour.update();
    this.draw();
  }
}