/// <reference path="firstscreen.ts"/>

namespace Screens {
    export class GameOverScreen extends FirstScreen {

        constructor() {
            super('gameover');
            document.getElementById('gameover').innerHTML = "Game over";
        }
    }
}