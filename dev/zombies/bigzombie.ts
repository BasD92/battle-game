/// <reference path="zombie.ts" />

class BigZombie extends Zombie {

  constructor(s: Subject) {
    super("bigZombie");

    // Set height and width
    this.height = 70;
    this.width = 70;

    // Set random x and y axis
    this.x = Math.random() * (window.innerWidth - this.width);
    this.y = Math.random() * (window.innerHeight - this.height);

    // Create Slow object
    this.behaviour = new Slow(this);

    // Subscribe Zombie to Player observer array
    this.player = s;
    this.player.subscribe(this);
  }

  public update(): void {
    // Update slow speed behaviour
    this.behaviour.update();

    this.y += this.speed;
    this.draw();
  }
}