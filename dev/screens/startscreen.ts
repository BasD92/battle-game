/// <reference path="firstscreen.ts"/>

namespace Screens {
    export class StartScreen extends FirstScreen {

        constructor() {
            super('start');

            let btn = document.createElement("button");
            this.div.appendChild(btn);
            btn.innerHTML = "Start Game";

            let title = document.createElement("title");
            this.div.appendChild(title);
            title.innerHTML = "Battle Game"

            btn.addEventListener("click", this.onStartClick.bind(this));

        }

        //zorgt voor het starten van de game
         private onStartClick(): void {
            this.div.remove();
            Game.getInstance().showGameScreen();
        }
    }
}