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
        this.speed = 0;
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
var Fast = (function () {
    function Fast(p) {
        this.player = p;
    }
    Fast.prototype.update = function () {
        this.player.speed = 8;
    };
    return Fast;
}());
var Food = (function (_super) {
    __extends(Food, _super);
    function Food() {
        var _this = _super.call(this) || this;
        _this.objectElement = document.createElement("food");
        document.body.appendChild(_this.objectElement);
        _this.height = 50;
        _this.width = 50;
        _this.x = Math.random() * (window.innerWidth - _this.width);
        _this.y = Math.random() * (window.innerHeight - _this.height);
        return _this;
    }
    Food.prototype.update = function () {
        this.objectElement.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
        this.objectElement.style.height = this.height + "px";
        this.objectElement.style.width = this.width + "px";
    };
    Food.prototype.getRectangle = function () {
        return this.objectElement.getBoundingClientRect();
    };
    return Food;
}(GameObject));
var Game = (function () {
    function Game() {
        this.zombies = new Array();
        this.objects = new Array();
        this.i = 0;
        this.x = 0;
        this.player1 = new Player("player1", 100, 100);
        for (this.i = 0; this.i < 3; this.i++) {
            this.zombies.push(new Zombie(this.player1));
        }
        for (this.x = 0; this.x < 2; this.x++) {
            this.objects.push(new Food());
            this.objects.push(new Rock());
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
        for (var _b = 0, _c = this.objects; _b < _c.length; _b++) {
            var object = _c[_b];
            object.update();
            if (object instanceof Food) {
                if (Util.checkCollision(this.player1.getRectangle(), object.getRectangle())) {
                    this.player1.strongerPlayer();
                }
            }
            if (object instanceof Rock) {
                if (Util.checkCollision(this.player1.getRectangle(), object.getRectangle())) {
                    console.log("Collission player and rock!");
                }
            }
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
        _this.observers = [];
        _this.shoot = 0;
        _this.objectElement = document.createElement(nameElement);
        document.body.appendChild(_this.objectElement);
        _this.x = setX;
        _this.y = setY;
        _this.height = 50;
        _this.width = 50;
        _this.bullet = new Bullet(_this.x, _this.y);
        _this.behaviour = new Fast(_this);
        window.addEventListener("keydown", function (e) { return _this.pressKey(e); });
        return _this;
    }
    Player.prototype.subscribe = function (o) {
        this.observers.push(o);
    };
    Player.prototype.strongerPlayer = function () {
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var o = _a[_i];
            o.notify("Player is eating food and is stronger now. Zombies are more afraid of the player.");
        }
    };
    Player.prototype.pressKey = function (e) {
        switch (e.keyCode) {
            case 38:
                this.y -= this.speed;
                break;
            case 40:
                this.y += this.speed;
                break;
            case 37:
                this.x -= this.speed;
                break;
            case 39:
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
        this.behaviour.update();
    };
    Player.prototype.getRectangle = function () {
        return this.objectElement.getBoundingClientRect();
    };
    return Player;
}(GameObject));
var Rock = (function (_super) {
    __extends(Rock, _super);
    function Rock() {
        var _this = _super.call(this) || this;
        _this.objectElement = document.createElement("rock");
        document.body.appendChild(_this.objectElement);
        _this.height = 60;
        _this.width = 60;
        _this.x = Math.random() * (window.innerWidth - _this.width);
        _this.y = Math.random() * (window.innerHeight - _this.height);
        return _this;
    }
    Rock.prototype.update = function () {
        this.objectElement.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
        this.objectElement.style.height = this.height + "px";
        this.objectElement.style.width = this.width + "px";
    };
    Rock.prototype.getRectangle = function () {
        return this.objectElement.getBoundingClientRect();
    };
    return Rock;
}(GameObject));
var Slow = (function () {
    function Slow(z) {
        this.zombie = z;
    }
    Slow.prototype.update = function () {
        this.zombie.speed = 1;
    };
    return Slow;
}());
var Util = (function () {
    function Util() {
    }
    Util.checkCollision = function (a, b) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom);
    };
    return Util;
}());
var Zombie = (function (_super) {
    __extends(Zombie, _super);
    function Zombie(s) {
        var _this = _super.call(this) || this;
        _this.objectElement = document.createElement("zombie");
        document.body.appendChild(_this.objectElement);
        _this.height = 70;
        _this.width = 70;
        _this.x = Math.random() * (window.innerWidth - _this.width);
        _this.y = Math.random() * (window.innerHeight - _this.height);
        _this.behaviour = new Slow(_this);
        _this.player = s;
        _this.player.subscribe(_this);
        return _this;
    }
    Zombie.prototype.notify = function (m) {
        console.log(m);
    };
    Zombie.prototype.update = function () {
        this.y += this.speed;
        this.objectElement.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
        this.objectElement.style.height = this.height + "px";
        this.objectElement.style.width = this.width + "px";
    };
    return Zombie;
}(GameObject));
//# sourceMappingURL=main.js.map