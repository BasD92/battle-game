var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Fast = (function () {
    function Fast(p) {
        this.player = p;
    }
    Fast.prototype.update = function () {
        this.player.speed = 12;
    };
    return Fast;
}());
var Screens;
(function (Screens) {
    var FirstScreen = (function () {
        function FirstScreen(name) {
            this.div = document.createElement(name);
            this.container = document.getElementById('container');
            this.container.appendChild(this.div);
        }
        return FirstScreen;
    }());
    Screens.FirstScreen = FirstScreen;
})(Screens || (Screens = {}));
var Screens;
(function (Screens) {
    var StartScreen = (function (_super) {
        __extends(StartScreen, _super);
        function StartScreen() {
            _super.call(this, 'start');
            var btn = document.createElement("button");
            this.div.appendChild(btn);
            btn.innerHTML = "Start Game";
            var title = document.createElement("title");
            this.div.appendChild(title);
            title.innerHTML = "Battle Game";
            btn.addEventListener("click", this.onStartClick.bind(this));
        }
        StartScreen.prototype.onStartClick = function () {
            this.div.remove();
            Game.getInstance().showGameScreen();
        };
        return StartScreen;
    }(Screens.FirstScreen));
    Screens.StartScreen = StartScreen;
})(Screens || (Screens = {}));
var Game = (function () {
    function Game() {
    }
    Game.getInstance = function () {
        if (!Game.instance) {
            Game.instance = new Game();
            Game.instance.showStartScreen();
        }
        return Game.instance;
    };
    Game.prototype.showStartScreen = function () {
        this.screen = new Screens.StartScreen();
    };
    Game.prototype.showGameScreen = function () {
        this.screen = new Screens.GameScreen();
    };
    Game.prototype.gameOver = function () {
        this.screen = new Screens.GameOverScreen();
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
        _super.call(this);
        this.objectElement = document.createElement("bullet");
        document.body.appendChild(this.objectElement);
        this.height = 30;
        this.width = 30;
        this.x = setX;
        this.y = setY;
        this.speed = 10;
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
        _super.call(this);
        this.objectElement = document.createElement("food");
        document.body.appendChild(this.objectElement);
        this.height = 50;
        this.width = 50;
        this.x = Math.random() * (window.innerWidth - this.width);
        this.y = Math.random() * (window.innerHeight - this.height);
    }
    Food.prototype.update = function () {
        this.draw();
    };
    return Food;
}(GameObject));
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(nameElement, setX, setY) {
        var _this = this;
        _super.call(this);
        this.life = 2;
        this.observers = [];
        this.bullets = [];
        this.objectElement = document.createElement(nameElement);
        document.body.appendChild(this.objectElement);
        this.x = setX;
        this.y = setY;
        this.height = 50;
        this.width = 50;
        this.behaviour = new Fast(this);
        window.addEventListener("keydown", function (e) { return _this.pressKey(e); });
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
        _super.call(this);
        this.objectElement = document.createElement("rock");
        document.body.appendChild(this.objectElement);
        this.height = 60;
        this.width = 60;
        this.x = Math.random() * (window.innerWidth - this.width);
        this.y = Math.random() * (window.innerHeight - this.height);
    }
    Rock.prototype.update = function () {
        this.draw();
    };
    return Rock;
}(GameObject));
var Zombie = (function (_super) {
    __extends(Zombie, _super);
    function Zombie(s) {
        _super.call(this);
        this.objectElement = document.createElement("zombie");
        document.body.appendChild(this.objectElement);
        this.height = 50;
        this.width = 50;
        this.x = Math.random() * (window.innerWidth - this.width);
        this.y = Math.random() * (window.innerHeight - this.height);
        this.behaviour = new Slow(this);
        this.player = s;
        this.player.subscribe(this);
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
var Screens;
(function (Screens) {
    var GameOverScreen = (function (_super) {
        __extends(GameOverScreen, _super);
        function GameOverScreen() {
            _super.call(this, 'gameover');
            document.getElementById('gameover').innerHTML = "Game over";
        }
        return GameOverScreen;
    }(Screens.FirstScreen));
    Screens.GameOverScreen = GameOverScreen;
})(Screens || (Screens = {}));
var Screens;
(function (Screens) {
    var GameScreen = (function (_super) {
        __extends(GameScreen, _super);
        function GameScreen() {
            _super.call(this, 'gamescreen');
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
        GameScreen.prototype.gameLoop = function () {
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
                Game.getInstance().gameOver();
                this.player1.remove();
                for (var _f = 0, _g = this.zombies; _f < _g.length; _f++) {
                    var zombie = _g[_f];
                    zombie.remove();
                }
                for (var _h = 0, _j = this.objects; _h < _j.length; _h++) {
                    var object = _j[_h];
                    object.remove();
                }
            }
            if (this.player1.life < 0) {
                this.player1.life = 0;
            }
            document.getElementById('zombies').innerHTML = "Zombies: " + this.zombieCounter;
            requestAnimationFrame(function () { return _this.gameLoop(); });
        };
        return GameScreen;
    }(Screens.FirstScreen));
    Screens.GameScreen = GameScreen;
})(Screens || (Screens = {}));
//# sourceMappingURL=main.js.map