class Game {

  // Create Game instance
  private static instance: Game;

  // Private constructor Singleton
  private constructor() {
    console.log("Game created!");
    this.gameLoop();
  }

  private gameLoop() {
    //console.log("Game Loop test.");
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