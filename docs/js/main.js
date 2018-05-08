"use strict";
var Bomb = (function () {
    function Bomb() {
    }
    return Bomb;
}());
var Food = (function () {
    function Food() {
    }
    return Food;
}());
var Game = (function () {
    function Game() {
        console.log("New game created!");
        new Player();
    }
    Game.getInstance = function () {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    };
    return Game;
}());
var GameObject = (function () {
    function GameObject() {
    }
    return GameObject;
}());
window.addEventListener("load", function () {
    Game.getInstance();
});
var Player = (function () {
    function Player() {
        console.log('Player created!');
    }
    return Player;
}());
//# sourceMappingURL=main.js.map