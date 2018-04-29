class Game {
    constructor(){
        console.log("New game created!")

        let p = new Player();
    }
}

window.addEventListener("load", () => new Game())