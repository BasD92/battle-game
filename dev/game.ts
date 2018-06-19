/// <reference path="screens/startscreen.ts"/>

class Game {
  private static instance: Game;

  private screen: Screens.FirstScreen;

  private constructor() {
  }

  public static getInstance() {
      if (!Game.instance) {
          Game.instance = new Game();
          Game.instance.showStartScreen();
      }
      return Game.instance;
  }

  public showStartScreen(): void {
      this.screen = new Screens.StartScreen();
  }

  public showGameScreen(): void {
      this.screen = new Screens.GameScreen();
  }

  public gameOver(): void {
      this.screen = new Screens.GameOverScreen();
  }

} 