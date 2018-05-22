class Game {

  // Create Game instance
  private static instance: Game;

  private player1: Player;

  // Private constructor Singleton
  private constructor() {
    this.player1 = new Player("player1", 100, 100);

    this.gameLoop();
  }

  private gameLoop() {
    // Update player
    this.player1.update();

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