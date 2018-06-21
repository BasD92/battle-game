class Eating implements Behaviour {

  player: GameObject;
  private counter: number = 0;

  constructor(p: GameObject) {
    this.player = p;
  }

  update(): void {
    // Improve speed of player for 5 seconds
    if (this.counter < 300) {
      console.log("Player eet en snelheid gaat voor 5 seconden omhoog")
      // Improve speed
      this.player.speed = 18;
      this.counter++;
    }
    else {
      this.player.speed = 12;
      this.player.behaviour = new Running(this.player);
    }
  }

  pressKey(e: KeyboardEvent): void {
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