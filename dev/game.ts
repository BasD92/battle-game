class Game {

  // Create Game instance
  private static instance: Game;
  private gameObjects: GameObject[] = []

  private player1: Player;

  private i: number = 0;

  // Private constructor Singleton
  private constructor() {
    this.player1 = new Player("player1", 100, 100);

    // Array with zombie objects.
    this.gameObjects.push(new Zombie(), new Zombie(), new Zombie(), new Zombie(), new Zombie())


    this.gameLoop();
  }

  private gameLoop() {
    // Update player
    this.player1.update();

    // update gameObjects, which includes zombies, etc...
    for (let objects of this.gameObjects) {
      objects.update()
    }

    requestAnimationFrame(() => this.gameLoop());
  }

  // Check if Game object exists
  public static getInstance() {
    if (!Game.instance) {
      Game.instance = new Game();
    }
    return Game.instance;
  }
}