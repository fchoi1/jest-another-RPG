const inquirer = require('inquirer');
const Player = require('./Player');
const Enemy = require('./Enemy');

function Game() {
    this.roundNumber = 0;
    this.isPlayerTurn = false;
    this.enemies = [];
    this.currentEnemy;
    this.player;

}

module.exports = Game;