const Potion = require('../lib/Potion');
const Character = require('./Character');

class Player extends Character{
    constructor(name=''){
        super(name);
        this.inventory = [new Potion('health'), new Potion()];
    }

    getStats(){
        return {
            potions: this.inventory.length,
            health: this.health,
            strength: this.strength,
            agility: this.agility
        };
    }

    getInventory(){
        return this.inventory.length ? this.inventory : false ;
    }

    addPotion(potion){
        this.inventory.push(potion);
    }

    usePotion(index){
        // takes the potion from inventory and updates array in place
        const potion = this.getInventory().splice(index, 1)[0];  
        switch(potion.name){
            case 'agility' :
                this.agility += potion.value;
                break;
            case 'health' :
                this.health += potion.value;
                break;
            case 'strength' :
                this.strength += potion.value;
                break;
        }
    };
}

module.exports = Player;