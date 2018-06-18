/// <reference path="gameobject.ts" />

class Zombie extends GameObject implements Observer {

  private behaviour: Behaviour;
  private player: Subject;

  constructor(s: Subject) {
    super();

    // Append zombie element to document
    this.objectElement = document.createElement("zombie");
    document.body.appendChild(this.objectElement);

    // Set height and width
    this.height = 50;
    this.width = 50;

    // Set random x and y axis
    this.x = Math.random() * (window.innerWidth - this.width);
    this.y = Math.random() * (window.innerHeight - this.height);

    // Create Slow object
    this.behaviour = new Slow(this);

    // Subscribe Zombie to Player observer array
    this.player = s;
    this.player.subscribe(this);
  }

  // Get notify from observer
  notify(m: string): void {
    console.log(m);

    // Zombies are shrinking
    this.height = 30;
    this.width = 30;
  }

  public update(): void {
    // Update slow speed behaviour
    this.behaviour.update();

    this.y += this.speed;
    this.draw();
  }

  // Reset zombies on top of screen
  public reset(): void {
    this.x = Math.random() * (window.innerWidth - this.width);
    this.y = 0;
  }
}