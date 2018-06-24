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
var Eating = (function () {
    function Eating(p) {
        this.counter = 0;
        this.player = p;
        this.eatSound = document.getElementsByTagName("audio")[0];
    }
    Eating.prototype.update = function () {
        if (this.counter < 300) {
            this.eatSound.play();
            this.player.speed = 18;
            this.player.height = 70;
            this.player.width = 70;
            this.counter++;
        }
        else {
            this.player.speed = 12;
            this.player.height = 50;
            this.player.width = 50;
            this.player.behaviour = new Running(this.player);
        }
    };
    Eating.prototype.pressKey = function (e) {
        switch (e.keyCode) {
            case 38:
                this.player.y -= this.player.speed;
                break;
            case 40:
                this.player.y += this.player.speed;
                break;
            case 37:
                this.player.x -= this.player.speed;
                break;
            case 39:
                this.player.x += this.player.speed;
                break;
        }
    };
    return Eating;
}());
var Game = (function () {
    function Game() {
        var _this = this;
        this.zombies = new Array();
        this.objects = new Array();
        this.bullets = new Array();
        this.i = 0;
        this.x = 0;
        this.zombieCounter = 4;
        this.life = 2;
        this.player1 = new Player(100, 200);
        for (this.i = 0; this.i < 2; this.i++) {
            this.zombies.push(new SmallZombie(this.player1));
            this.zombies.push(new BigZombie(this.player1));
        }
        for (this.x = 0; this.x < 2; this.x++) {
            this.objects.push(new Food());
            this.objects.push(new Rock());
        }
        window.addEventListener("keydown", function (e) { return _this.pressKey(e); });
        this.gameLoop();
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.player1.update();
        this.displayLives();
        if (this.zombieCounter == 0) {
            this.player1.speed = 0;
            document.getElementById('win').innerHTML = "You won!";
        }
        for (var _i = 0, _a = this.bullets; _i < _a.length; _i++) {
            var bullet = _a[_i];
            bullet.update();
            if (bullet.getRectangle().right > window.innerWidth - 5) {
                bullet.remove();
                var index = this.bullets.indexOf(bullet);
                this.bullets.splice(index, 1);
            }
        }
        for (var _b = 0, _c = this.zombies; _b < _c.length; _b++) {
            var zombie = _c[_b];
            zombie.update();
            if (this.life == 0) {
                zombie.remove();
            }
            if (Util.checkCollision(this.player1.getRectangle(), zombie.getRectangle())) {
                this.life -= 1;
                this.player1.x = 100;
                this.player1.y = 200;
            }
            for (var _d = 0, _e = this.bullets; _d < _e.length; _d++) {
                var bullet = _e[_d];
                if (Util.checkCollision(bullet.getRectangle(), zombie.getRectangle())) {
                    this.zombieCounter -= 1;
                    bullet.remove();
                    zombie.remove();
                    var index = this.bullets.indexOf(bullet);
                    this.bullets.splice(index, 1);
                    var index2 = this.zombies.indexOf(zombie);
                    this.zombies.splice(index2, 1);
                    this.player1.unsubscribe(zombie);
                }
            }
            if (zombie.getRectangle().bottom > window.innerHeight - 5) {
                zombie.reset();
            }
        }
        for (var _f = 0, _g = this.objects; _f < _g.length; _f++) {
            var object = _g[_f];
            object.update();
            if (object instanceof Food) {
                if (Util.checkCollision(this.player1.getRectangle(), object.getRectangle())) {
                    this.player1.strongerPlayer();
                    this.player1.behaviour = new Eating(this.player1);
                    this.life += 1;
                    object.remove();
                    var index = this.objects.indexOf(object);
                    this.objects.splice(index, 1);
                }
            }
            if (object instanceof Rock) {
                if (Util.checkCollision(this.player1.getRectangle(), object.getRectangle())) {
                    this.life -= 1;
                    this.player1.behaviour = new Sleeping(this.player1);
                }
            }
        }
        if (this.life == 0) {
            this.player1.speed = 0;
            document.getElementById('lose').innerHTML = "Game over";
        }
        if (this.life < 0) {
            this.life = 0;
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
    Game.prototype.displayLives = function () {
        document.getElementById('life').innerHTML = "Lives: " + this.life;
    };
    Game.prototype.addBullet = function (setX, setY) {
        this.bullets.push(new Bullet(setX, setY));
    };
    Game.prototype.pressKey = function (e) {
        if (e.keyCode == 32) {
            this.addBullet(this.player1.x, this.player1.y);
        }
    };
    return Game;
}());
window.addEventListener("load", function () {
    Game.getInstance();
});
var Running = (function () {
    function Running(p) {
        this.player = p;
    }
    Running.prototype.update = function () {
    };
    Running.prototype.pressKey = function (e) {
        switch (e.keyCode) {
            case 38:
                this.player.y -= this.player.speed;
                break;
            case 40:
                this.player.y += this.player.speed;
                break;
            case 37:
                this.player.x -= this.player.speed;
                break;
            case 39:
                this.player.x += this.player.speed;
                break;
        }
    };
    return Running;
}());
var Sleeping = (function () {
    function Sleeping(p) {
        this.sleepCounter = 0;
        this.player = p;
        this.sleepSound = document.getElementsByTagName("audio")[1];
    }
    Sleeping.prototype.update = function () {
        if (this.sleepCounter < 60) {
            this.sleepSound.play();
            this.player.x = 100;
            this.player.y = 200;
            this.sleepCounter++;
        }
        else {
            this.player.behaviour = new Running(this.player);
        }
    };
    Sleeping.prototype.pressKey = function () {
    };
    return Sleeping;
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
    function GameObject(nameElement) {
        this.objectElement = document.createElement(nameElement);
        this.container = document.getElementById('container');
        this.container.appendChild(this.objectElement);
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
        var _this = _super.call(this, "bullet") || this;
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
        var _this = _super.call(this, "food") || this;
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
    function Player(setX, setY) {
        var _this = _super.call(this, "player1") || this;
        _this.observers = [];
        _this.behaviour = new Running(_this);
        _this.height = 50;
        _this.width = 50;
        _this.x = setX;
        _this.y = setY;
        _this.speed = 12;
        window.addEventListener("keydown", function (e) { return _this.pressKey(e); });
        return _this;
    }
    Player.prototype.subscribe = function (o) {
        this.observers.push(o);
    };
    Player.prototype.unsubscribe = function (o) {
        var index = this.observers.indexOf(o);
        this.observers.splice(index, 1);
    };
    Player.prototype.strongerPlayer = function () {
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var o = _a[_i];
            o.notify();
        }
    };
    Player.prototype.pressKey = function (e) {
        this.behaviour.pressKey(e);
    };
    Player.prototype.update = function () {
        this.behaviour.update();
        this.draw();
    };
    return Player;
}(GameObject));
var Rock = (function (_super) {
    __extends(Rock, _super);
    function Rock() {
        var _this = _super.call(this, "rock") || this;
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
var Zombie = (function () {
    function Zombie(nameElement) {
        this.objectElement = document.createElement(nameElement);
        this.container = document.getElementById('container');
        this.container.appendChild(this.objectElement);
        this.speed = 2;
    }
    Zombie.prototype.update = function () {
    };
    Zombie.prototype.notify = function () {
        this.height -= 10;
        this.width -= 10;
    };
    Zombie.prototype.draw = function () {
        this.objectElement.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
        this.objectElement.style.height = this.height + "px";
        this.objectElement.style.width = this.width + "px";
    };
    Zombie.prototype.getRectangle = function () {
        return this.objectElement.getBoundingClientRect();
    };
    Zombie.prototype.reset = function () {
        this.x = Math.random() * (window.innerWidth - this.width);
        this.y = 0;
    };
    Zombie.prototype.remove = function () {
        this.objectElement.remove();
    };
    return Zombie;
}());
var BigZombie = (function (_super) {
    __extends(BigZombie, _super);
    function BigZombie(s) {
        var _this = _super.call(this, "bigZombie") || this;
        _this.height = 70;
        _this.width = 70;
        _this.x = Math.random() * (window.innerWidth - _this.width);
        _this.y = Math.random() * (window.innerHeight - _this.height);
        _this.player = s;
        _this.player.subscribe(_this);
        return _this;
    }
    BigZombie.prototype.update = function () {
        this.y += this.speed;
        this.draw();
    };
    return BigZombie;
}(Zombie));
var SmallZombie = (function (_super) {
    __extends(SmallZombie, _super);
    function SmallZombie(s) {
        var _this = _super.call(this, "smallzombie") || this;
        _this.height = 50;
        _this.width = 50;
        _this.x = Math.random() * (window.innerWidth - _this.width);
        _this.y = Math.random() * (window.innerHeight - _this.height);
        _this.player = s;
        _this.player.subscribe(_this);
        return _this;
    }
    SmallZombie.prototype.update = function () {
        this.y += this.speed;
        this.draw();
    };
    return SmallZombie;
}(Zombie));
//# sourceMappingURL=main.js.map