class Game {

  // Create Game instance
  private static instance: Game;

  private player1: Player;
  private zombies: Array<Zombie> = new Array();
  private i: number = 0;

  // Private constructor Singleton
  private constructor() {
    this.player1 = new Player("player1", 100, 100);

    // Push zombies to array
    for (this.i = 0; this.i < 10; this.i++) {
      this.zombies.push(new Zombie());
    }

    this.gameLoop();
  }

  private gameLoop() {
    // Update player
    this.player1.update();

    // Update all zombies in array
    for (let zombie of this.zombies) {
      zombie.update();
    }

    requestAnimationFrame(()=>this.gameLoop());
  }

  // Check if Game object exists
  public static getInstance() {
    if (!Game.instance) {
      Game.instance = new Game();
    }
    return Game.instance;
  }
}