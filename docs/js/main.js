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
var Fast = (function () {
    function Fast(p) {
        this.player = p;
    }
    Fast.prototype.update = function () {
        this.player.speed = 12;
    };
    return Fast;
}());
var Game = (function () {
    function Game() {
        this.zombies = new Array();
        this.objects = new Array();
        this.i = 0;
        this.x = 0;
        this.zombieCounter = 3;
        this.player1 = new Player("player1", 100, 100);
        for (this.i = 0; this.i < this.zombieCounter; this.i++) {
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
        if (this.zombieCounter == 0) {
            console.log("Player wins!");
        }
        for (var _i = 0, _a = this.zombies; _i < _a.length; _i++) {
            var zombie = _a[_i];
            zombie.update();
            if (Util.checkCollision(this.player1.getRectangle(), zombie.getRectangle())) {
                console.log("Collission player and zombie!");
                this.player1.life -= 1;
                this.player1.x = 100;
                this.player1.y = 100;
            }
            for (var _b = 0, _c = this.player1.bullets; _b < _c.length; _b++) {
                var bullet = _c[_b];
                if (Util.checkCollision(bullet.getRectangle(), zombie.getRectangle())) {
                    this.zombieCounter -= 1;
                    bullet.remove();
                    zombie.remove();
                    var index = this.player1.bullets.indexOf(bullet);
                    this.player1.bullets.splice(index, 1);
                    var index2 = this.zombies.indexOf(zombie);
                    this.zombies.splice(index2, 1);
                }
            }
            if (zombie.getRectangle().bottom > window.innerHeight - 5) {
                zombie.reset();
            }
        }
        for (var _d = 0, _e = this.objects; _d < _e.length; _d++) {
            var object = _e[_d];
            object.update();
            if (object instanceof Food) {
                if (Util.checkCollision(this.player1.getRectangle(), object.getRectangle())) {
                    this.player1.strongerPlayer();
                    this.player1.life += 1;
                    object.remove();
                    var index = this.objects.indexOf(object);
                    this.objects.splice(index, 1);
                }
            }
            if (object instanceof Rock) {
                if (Util.checkCollision(this.player1.getRectangle(), object.getRectangle())) {
                    this.player1.life -= 1;
                    this.player1.x = 100;
                    this.player1.y = 100;
                }
            }
        }
        if (this.player1.life == 0) {
            this.gameOver();
        }
        if (this.player1.life < 0) {
            this.player1.life = 0;
        }
        document.getElementById('zombies').innerHTML = "Zombies: " + this.zombieCounter;
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.getInstance = function () {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    };
    Game.prototype.gameOver = function () {
        console.log("Game over!");
    };
    return Game;
}());
window.addEventListener("load", function () {
    Game.getInstance();
});
var Slow = (function () {
    function Slow(z) {
        this.zombie = z;
    }
    Slow.prototype.update = function () {
        this.zombie.speed = 2;
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
var GameObject = (function () {
    function GameObject() {
        this.speed = 0;
    }
    GameObject.prototype.update = function () {
    };
    GameObject.prototype.draw = function () {
        this.objectElement.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
        this.objectElement.style.height = this.height + "px";
        this.objectElement.style.width = this.width + "px";
    };
    GameObject.prototype.getRectangle = function () {
        return this.objectElement.getBoundingClientRect();
    };
    GameObject.prototype.remove = function () {
        this.objectElement.remove();
    };
    return GameObject;
}());
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
        _this.speed = 10;
        return _this;
    }
    Bullet.prototype.update = function () {
        this.x += this.speed;
        this.draw();
    };
    return Bullet;
}(GameObject));
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
        this.draw();
    };
    return Food;
}(GameObject));
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(nameElement, setX, setY) {
        var _this = _super.call(this) || this;
        _this.life = 2;
        _this.observers = [];
        _this.bullets = [];
        _this.objectElement = document.createElement(nameElement);
        document.body.appendChild(_this.objectElement);
        _this.x = setX;
        _this.y = setY;
        _this.height = 50;
        _this.width = 50;
        _this.behaviour = new Fast(_this);
        window.addEventListener("keydown", function (e) { return _this.pressKey(e); });
        return _this;
    }
    Player.prototype.addBullet = function (setX, setY) {
        this.bullets.push(new Bullet(setX, setY));
    };
    Player.prototype.subscribe = function (o) {
        this.observers.push(o);
    };
    Player.prototype.strongerPlayer = function () {
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var o = _a[_i];
            o.notify("Player is eating food and is stronger now. Zombies are more afraid of the player and shrink");
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
                this.addBullet(this.x, this.y);
                break;
        }
    };
    Player.prototype.displayLives = function () {
        document.getElementById('life').innerHTML = "Lives: " + this.life;
    };
    Player.prototype.update = function () {
        this.draw();
        this.displayLives();
        for (var _i = 0, _a = this.bullets; _i < _a.length; _i++) {
            var bullet = _a[_i];
            bullet.update();
            if (bullet.getRectangle().right > window.innerWidth) {
                bullet.remove();
                var index = this.bullets.indexOf(bullet);
                this.bullets.splice(index, 1);
            }
        }
        this.behaviour.update();
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
        this.draw();
    };
    return Rock;
}(GameObject));
var Zombie = (function (_super) {
    __extends(Zombie, _super);
    function Zombie(s) {
        var _this = _super.call(this) || this;
        _this.objectElement = document.createElement("zombie");
        document.body.appendChild(_this.objectElement);
        _this.height = 50;
        _this.width = 50;
        _this.x = Math.random() * (window.innerWidth - _this.width);
        _this.y = Math.random() * (window.innerHeight - _this.height);
        _this.behaviour = new Slow(_this);
        _this.player = s;
        _this.player.subscribe(_this);
        return _this;
    }
    Zombie.prototype.notify = function (m) {
        console.log(m);
        this.height = 30;
        this.width = 30;
    };
    Zombie.prototype.update = function () {
        this.behaviour.update();
        this.y += this.speed;
        this.draw();
    };
    Zombie.prototype.reset = function () {
        this.x = Math.random() * (window.innerWidth - this.width);
        this.y = 0;
    };
    return Zombie;
}(GameObject));
//# sourceMappingURL=main.js.map