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
    GameObject.prototype.update = function () {
    };
    return GameObject;
}());
var Bomb = (function (_super) {
    __extends(Bomb, _super);
    function Bomb() {
        return _super.call(this) || this;
    }
    return Bomb;
}(GameObject));
var Bullet = (function (_super) {
    __extends(Bullet, _super);
    function Bullet(setX, setY) {
        var _this = _super.call(this) || this;
        _this.objectElement = document.createElement("bullet");
        document.body.appendChild(_this.objectElement);
        _this.height = 30;
        _this.width = 30;
        _this.x = setX;
        _this.y = setY;
        _this.speed = 4;
        return _this;
    }
    Bullet.prototype.update = function () {
        console.log(this.x += this.speed);
        this.objectElement.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
        this.objectElement.style.height = this.height + "px";
        this.objectElement.style.width = this.width + "px";
    };
    return Bullet;
}(GameObject));
var Food = (function (_super) {
    __extends(Food, _super);
    function Food() {
        return _super.call(this) || this;
    }
    Food.prototype.update = function () {
        this.objectElement.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
        this.objectElement.style.height = this.height + "px";
        this.objectElement.style.width = this.width + "px";
    };
    return Food;
}(GameObject));
var Game = (function () {
    function Game() {
        this.zombies = new Array();
        this.i = 0;
        this.player1 = new Player("player1", 100, 100);
        for (this.i = 0; this.i < 5; this.i++) {
            this.zombies.push(new Zombie());
        }
        this.gameLoop();
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.player1.update();
        for (var _i = 0, _a = this.zombies; _i < _a.length; _i++) {
            var zombie = _a[_i];
            zombie.update();
        }
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
        _this.bullets = new Array();
        _this.shoot = 0;
        _this.objectElement = document.createElement(nameElement);
        document.body.appendChild(_this.objectElement);
        _this.x = setX;
        _this.y = setY;
        _this.height = 50;
        _this.width = 50;
        _this.speed = 4;
        _this.bullet = new Bullet(_this.x, _this.y);
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
            case 32:
                this.shoot = 1;
                break;
        }
    };
    Player.prototype.update = function () {
        this.objectElement.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
        this.objectElement.style.height = this.height + "px";
        this.objectElement.style.width = this.width + "px";
        if (this.x == window.innerWidth - this.width) {
        }
        if (this.shoot == 1) {
            this.bullet.update();
        }
    };
    return Player;
}(GameObject));
var Rock = (function (_super) {
    __extends(Rock, _super);
    function Rock() {
        return _super.call(this) || this;
    }
    Rock.prototype.update = function () {
        this.objectElement.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
        this.objectElement.style.height = this.height + "px";
        this.objectElement.style.width = this.width + "px";
    };
    return Rock;
}(GameObject));
var Zombie = (function (_super) {
    __extends(Zombie, _super);
    function Zombie() {
        var _this = _super.call(this) || this;
        _this.objectElement = document.createElement("zombie");
        document.body.appendChild(_this.objectElement);
        _this.height = 70;
        _this.width = 70;
        _this.x = Math.random() * (window.innerWidth - _this.width);
        _this.y = Math.random() * (window.innerHeight - _this.height);
        _this.speed = 4;
        return _this;
    }
    Zombie.prototype.update = function () {
        this.objectElement.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
        this.objectElement.style.height = this.height + "px";
        this.objectElement.style.width = this.width + "px";
    };
    return Zombie;
}(GameObject));
//# sourceMappingURL=main.js.map