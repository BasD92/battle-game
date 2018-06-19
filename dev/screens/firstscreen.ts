namespace Screens {
    export abstract class FirstScreen {
        protected div: HTMLElement;
        private container: HTMLElement;

        constructor(name:string) {
            this.div = document.createElement(name);
            this.container = document.getElementById('container');
            this.container.appendChild(this.div);
        }
    }
}