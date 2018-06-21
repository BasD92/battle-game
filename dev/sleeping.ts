class Sleeping implements Behaviour {

  player: GameObject;
  private sleepCounter: number = 0;

  constructor(p: GameObject) {
    this.player = p;
  }

  update(): void {
    if (this.sleepCounter < 60) {
      console.log('Player slaapt!');
      // Player to start position and sleeps for a second
      this.player.x = 100;
      this.player.y = 200;
      this.sleepCounter++;
    }
    else {
      this.player.behaviour = new Running(this.player);
    }
  }

  pressKey(): void {

  }
}