class Slow implements Behaviour {

  zombie: GameObject;

  constructor(z: GameObject) {
    this.zombie = z;
  }

  public update(): void {
    this.zombie.speed = 1;
  }
}