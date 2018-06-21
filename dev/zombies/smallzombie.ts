/// <reference path="zombie.ts" />

class SmallZombie extends Zombie {

  constructor(s: Subject) {
    super("smallzombie");

    // Set height and width
    this.height = 50;
    this.width = 50;

    // Set random x and y axis
    this.x = Math.random() * (window.innerWidth - this.width);
    this.y = Math.random() * (window.innerHeight - this.height);

    // Subscribe Zombie to Player observer array
    this.player = s;
    this.player.subscribe(this);
  }

  public update(): void {
    this.y += this.speed;
    this.draw();
  }
}