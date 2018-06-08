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
    this.height = 70;
    this.width = 70;

    // Set random x and y axis
    this.x = Math.random() * (window.innerWidth - this.width);
    this.y = Math.random() * (window.innerHeight - this.height);

    // Create Slow object
    this.behaviour = new Slow(this);

    // Subscribe Zombie to Player
    this.player = s;
    this.player.subscribe(this);
  }

  notify(m: string): void {
    console.log(m);
  }

  public update(): void {
    // Update slow speed behaviour
    this.behaviour.update();

    this.y += this.speed;
    this.objectElement.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    this.objectElement.style.height = this.height + "px";
    this.objectElement.style.width = this.width + "px";
  }

  public reset(): void {
    this.x = Math.random() * (window.innerWidth - this.width);
    this.y = 0;
  }

  // Rectangle of Zombie
  public getRectangle() {
    return this.objectElement.getBoundingClientRect();
  }
}