const Potion = require('../lib/potion');
const Character = require('./Character');

class Enemy extends Character{
    constructor(name, weapon){
        super(name);
        this.health = Math.floor(Math.random() * 10 + 85);
        this.strength = Math.floor(Math.random() * 5 + 5);
        this.agility = Math.floor(Math.random() * 5 + 5);

        this.weapon = weapon;
        this.potion = new Potion();
    }

    getStats(){
        return {
            health: this.health,
            strength: this.strength,
            agility: this.agility
        };
    }

    getDescription(){
        return `A ${this.name} holding a ${this.weapon} has appeared!`;
    };
}

module.exports = Enemy;
