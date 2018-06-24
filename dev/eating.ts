class Eating implements Behaviour {

  public player: GameObject;
  private counter: number = 0;
  private eatSound: HTMLAudioElement;

  constructor(p: GameObject) {
    this.player = p;
    this.eatSound = document.getElementsByTagName("audio")[0];
  }

  public update(): void {
    // Improve speed of player for 5 seconds
    if (this.counter < 300) {
      // Play eat sound effect
      this.eatSound.play();

      // Improve speed
      this.player.speed = 18;

      // Increase height and width
      this.player.height = 70;
      this.player.width = 70;

      this.counter++;
    }
    else {
      // Back to normal speed and size
      this.player.speed = 12;
      this.player.height = 50;
      this.player.width = 50;
      this.player.behaviour = new Running(this.player);
    }
  }

  public pressKey(e: KeyboardEvent): void {
    switch (e.keyCode) {
      case 38: // Up arrow
        this.player.y -= this.player.speed;
        break;
      case 40: // Down arrow
        this.player.y += this.player.speed;
        break;
      case 37: // Left arrow
        this.player.x -= this.player.speed;
        break;
      case 39: // Right arrow
        this.player.x += this.player.speed;
        break;
    }
  }
}