class Slow implements Behaviour {

  zombie: Zombie;

  constructor(z: Zombie) {
    this.zombie = z;
  }

  public update(): void {
    this.zombie.speed = 2;
  }
}