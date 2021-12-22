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

    // console.log('Enmey are as follows:');
    // console.table(this.currentEnemy.getStats());
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

                // Check empty inventory
                if(!this.player.getInventory){
                    console.log("You don't have any potions!");
                    return this.checkEndOfBattle();
                }
                inquirer.prompt([{
                    type: 'list',
                    message: 'Which potions would you like to use?',
                    name: 'action',
                    choices: this.player.getInventory().map((item, index) => `${index + 1}: ${item.name}`)
                }])
                .then(({action}) => {
                    const potionDetails = action.split(':');
                    console.log(potionDetails)
                    this.player.usePotion(potionDetails[0] - 1);
                    console.log(`You used ${potionDetails[1]} potion`)

                    return this.checkEndOfBattle();
                });
            }else{
                const damage = this.player.getAttackValue();
                this.currentEnemy.reduceHealth(damage);
                console.log(`You attacked the ${this.currentEnemy.name}`);
                console.log(this.currentEnemy.getHealth());

                return this.checkEndOfBattle();
            }
        })
    }else{
        const damage = this.currentEnemy.getAttackValue();
        this.player.reduceHealth(damage);
        console.log(`You were attached by the ${this.currentEnemy.name}`);
        console.log(this.player.getHealth());

        return this.checkEndOfBattle();
    }
}

Game.prototype.checkEndOfBattle = function(){
    if(this.player.isAlive() && this.currentEnemy.isAlive()){

        this.isPlayerTurn = !this.isPlayerTurn;
        this.battle();

    }else if(this.player.isAlive() && !this.currentEnemy.isAlive()){

        console.log(`You've have defeate the ${this.currentEnemy.name}`);

        this.player.addPotion(this.currentEnemy.potion);
        console.log(`${this.player.name} found a ${this.currentEnemy.potion.name} potion`);

        this.roundNumber++;
        if(this.roundNumber < this.enemies.length){
            this.currentEnemy = this.enemies[this.roundNumber];
            this.startNewBattle();
        }else{
            console.log("You Win!")
        }
    }else{
        console.log("You have been defeated!");
    }

    

}



module.exports = Game;