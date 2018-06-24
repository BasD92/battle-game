class Sleeping implements Behaviour {

  public player: GameObject;
  private sleepCounter: number = 0;
  private sleepSound: HTMLAudioElement;

  constructor(p: GameObject) {
    this.player = p;
    this.sleepSound = document.getElementsByTagName("audio")[1];
  }

  public update(): void {
    if (this.sleepCounter < 60) {
      // Play eat sound effect
      this.sleepSound.play();

      // Player to start position and sleeps for a second
      this.player.x = 100;
      this.player.y = 200;
      this.sleepCounter++;
    }
    else {
      this.player.behaviour = new Running(this.player);
    }
  }

  public pressKey(): void {

  }
}