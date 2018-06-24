class Running implements Behaviour {

  public player: GameObject;

  constructor(p: GameObject) {
    this.player = p;
  }

  public update(): void {

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