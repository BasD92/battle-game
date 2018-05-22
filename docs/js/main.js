var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GameObject = (function () {
    function GameObject() {
    }
    return GameObject;
}());
var Bomb = (function (_super) {
    __extends(Bomb, _super);
    function Bomb() {
        return _super.call(this) || this;
    }
    return Bomb;
}(GameObject));
var bullet = (function (_super) {
    __extends(bullet, _super);
    function bullet() {
        return _super.call(this) || this;
    }
    return bullet;
}(GameObject));
var Food = (function (_super) {
    __extends(Food, _super);
    function Food() {
        return _super.call(this) || this;
    }
    return Food;
}(GameObject));
var Game = (function () {
    function Game() {
        this.player1 = new Player("player1", 100, 100);
        this.gameLoop();
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.player1.update();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.getInstance = function () {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    };
    return Game;
}());
window.addEventListener("load", function () {
    Game.getInstance();
});
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(nameElement, setX, setY) {
        var _this = _super.call(this) || this;
        _this.objectElement = document.createElement(nameElement);
        document.body.appendChild(_this.objectElement);
        _this.x = setX;
        _this.y = setY;
        _this.height = 50;
        _this.width = 50;
        _this.speed = 4;
        window.addEventListener("keydown", function (e) { return _this.pressKey(e); });
        return _this;
    }
    Player.prototype.pressKey = function (e) {
        switch (e.keyCode) {
            case 38:
                console.log("Up arrow key was pressed!");
                this.y -= this.speed;
                break;
            case 40:
                console.log("Down arrow key was pressed!");
                this.y += this.speed;
                break;
            case 37:
                console.log("Left arrow key was pressed!");
                this.x -= this.speed;
                break;
            case 39:
                console.log("Right arrow key was pressed!");
                this.x += this.speed;
                break;
        }
    };
    Player.prototype.update = function () {
        this.objectElement.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
        this.objectElement.style.height = this.height + "px";
        this.objectElement.style.width = this.width + "px";
    };
    return Player;
}(GameObject));
var Zombie = (function (_super) {
    __extends(Zombie, _super);
    function Zombie() {
        return _super.call(this) || this;
    }
    return Zombie;
}(GameObject));
//# sourceMappingURL=main.js.map