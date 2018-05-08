class Game {

  // Create Game instance
  private static instance: Game;

  private constructor() {
    console.log("New game created!")

    new Player();
  }

  // Check if Game object exists
  public static getInstance() {
    if (!Game.instance) {
      Game.instance = new Game();
    }
    return Game.instance;
  }
}