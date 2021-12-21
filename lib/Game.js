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

Game.prototype.initializeGame = function(){
    // Create Enemies
    this.enemies.push(new Enemy('goblin', 'sword'));
    this.enemies.push(new Enemy('orc', 'baseball bat'));
    this.enemies.push(new Enemy('skeleton', 'axe'));
    this.currentEnemy = this.enemies[0];

    // Create player
    inquirer.prompt([{
        type: 'text',
        name: 'name',
        message: 'What is your name?'
    }])
    .then(({name}) => {
        this.player = new Player(name);
        this.startNewBattle();
    })
}

Game.prototype.startNewBattle = function(){
    this.isPlayerTurn = this.player.agility > this.currentEnemy.agility ?  false : true;
    console.log('Your stats are as follows:');
    console.table(this.player.getStats());
    console.log(this.currentEnemy.getDescription());
    this.battle();
}

Game.prototype.battle = function(){
    if(this.isPlayerTurn){
        inquirer.prompt([{
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: ['Attack', 'Use potion']
        }])
        .then(({action}) => {
            // If use potion is selected
            if(action === 'Use potion'){
                inquirer.prompt([{
                    type: 'list',
                    message: 'Which potions would you like to use?',
                    name: 'action',
                    choices: this.player.getInventory().map((item, index) => `${index + 1}: ${item.name}`)
                }])
                .then(({action}) => {
                    const potionDetails = action.split(':');
                    this.player.usePotion(potionDetails[0] - 1);
                    console.log(`You used ${this.player.potionDetails[1]} potion`)
                });

            }else{
                const damage = this.isPlayerTurn.getAttackValue();
                this.currentEnemy.reduceHealth(damage);
            }
        })
    }else{
        const damage = this.currentEnemy.getAttackValue();
        this.player.reduceHealth(damage);
        console.log(`You were attached by the ${this.currentEnemy.name}`);
        console.log(this.player.getHealth());
    }
}



module.exports = Game;