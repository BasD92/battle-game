class Game {

  // Create Game instance
  private static instance: Game;

  private player1: Player;
  private zombies: Array<Zombie> = new Array();
  private objects: Array<GameObject> = new Array();
  private bullets: Array<Bullet> = new Array();
  private i: number = 0;
  private x: number = 0;
  private zombieCounter: number = 4;
  private life: number = 2;

  // Private constructor Singleton
  private constructor() {
    this.player1 = new Player(100, 200);

    // Push zombies to array
    for (this.i = 0; this.i < 2; this.i++) {
      this.zombies.push(new SmallZombie(this.player1));
      this.zombies.push(new BigZombie(this.player1));
    }

    // Push objects to array
    for (this.x = 0; this.x < 2; this.x++) {
      this.objects.push(new Food());
      this.objects.push(new Rock());
    }

    // Keyboard event listener
    window.addEventListener("keydown", (e: KeyboardEvent) => this.pressKey(e));

    this.gameLoop();
  }

  private gameLoop(): void {
    // Update player and display lives
    this.player1.update();
    this.displayLives();

    // Check when player wins
    if (this.zombieCounter == 0) {
      console.log("Player wins!");
    }

    // Update bullets and remove
    for (let bullet of this.bullets) {
      bullet.update();

      if (bullet.getRectangle().right > window.innerWidth) {
        // Remove element and object from array
        bullet.remove();
        let index = this.bullets.indexOf(bullet);
        this.bullets.splice(index, 1);
      }
    }

    // Update all zombies in array and check collisions
    for (let zombie of this.zombies) {
      zombie.update();

      if (Util.checkCollision(this.player1.getRectangle(), zombie.getRectangle())) {
        console.log("Collission player and zombie!");

        // Subtract life
        this.life -= 1;

        // Player to start position
        this.player1.x = 100;
        this.player1.y = 200;
      }

      // Check collisions with bullets
      for (let bullet of this.bullets) {
        if (Util.checkCollision(bullet.getRectangle(), zombie.getRectangle())) {
          // Subtract zombieCounter
          this.zombieCounter -= 1;

          // Remove bullet and zombie element and object in array
          bullet.remove();
          zombie.remove();
          let index = this.bullets.indexOf(bullet);
          this.bullets.splice(index, 1);
          let index2 = this.zombies.indexOf(zombie);
          this.zombies.splice(index2, 1);
          // Also remove Zombie from obervers array
          this.player1.unsubscribe(zombie);
        }
      }

      if (zombie.getRectangle().bottom > window.innerHeight - 5) {
        zombie.reset();
      }
    }

    // Update all objects in array and check collisions
    for (let object of this.objects) {
      object.update();

      if (object instanceof Food) {
        if (Util.checkCollision(this.player1.getRectangle(), object.getRectangle())) {
          // Notify all zombies when player eats food and is stronger.
          this.player1.strongerPlayer();

          // Eating behaviour
          this.player1.behaviour = new Eating(this.player1);

          // Add life
          this.life += 1;

          // Remove food element from DOM
          object.remove();

          // Remove food object from array
          let index = this.objects.indexOf(object);
          this.objects.splice(index, 1);
        }
      }

      if (object instanceof Rock) {
        if (Util.checkCollision(this.player1.getRectangle(), object.getRectangle())) {
          // Subtract life
          this.life -= 1;

          // Sleeping behaviour (Soldier is dizzy and sleeps for a second)
          this.player1.behaviour = new Sleeping(this.player1);
        }
      }
    }

    // Game over when lives of player is 0
    if (this.life == 0) {
      this.gameOver();
    }

    // Set lives to 0 when lives are less than 0
    if (this.life < 0) {
      this.life = 0;
    }

    document.getElementById('zombies').innerHTML = "Zombies: " + this.zombieCounter;

    requestAnimationFrame(() => this.gameLoop());
  }

  // Check if Game object exists
  public static getInstance(): Game {
    if (!Game.instance) {
      Game.instance = new Game();
    }
    return Game.instance;
  }

  public displayLives() {
    document.getElementById('life').innerHTML = "Lives: " + this.life;
  }

  public addBullet(setX: number, setY: number) {
    this.bullets.push(new Bullet(setX, setY));
  }

  private pressKey(e: KeyboardEvent): void {
    if (e.keyCode == 32) {
      this.addBullet(this.player1.x, this.player1.y);
    }
  }

  public gameOver(): void {
    console.log("Game over!");
  }
}