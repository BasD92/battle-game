"use strict";
var Game = (function () {
    function Game() {
        console.log("New game created!");
        var p = new Player();
    }
    return Game;
}());
window.addEventListener("load", function () { return new Game(); });
var Player = (function () {
    function Player() {
        console.log('Player created!');
    }
    return Player;
}());
//# sourceMappingURL=main.js.map