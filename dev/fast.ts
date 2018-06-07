class Fast implements Behaviour {

  player: GameObject;

  constructor(p: GameObject) {
    this.player = p;
  }

  public update(): void {
    this.player.speed = 8;
  }
}