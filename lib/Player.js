const Potion = require('../lib/Potion');

function Player(name=''){
    this.name = name;
    this.health = Math.floor(Math.random() * 10 + 95);
    this.strength = Math.floor(Math.random() * 5 + 7);
    this.agility = Math.floor(Math.random() * 5 + 7);
    this.inventory = [new Potion('health', new Potion())];

    // use prototype!!!!
    // this.getStats = function(){
    //     return {
    //         potions: this.inventory.length,
    //         health: this.health,
    //         strength: this.strength,
    //         agility: this.agility
    //     };
    // };

    // this.getInventory = function(){
    //     return this.inventory.length ? this.inventory : false ;
    // }
}

Player.prototype.getStats = function(){
    return {
        potions: this.inventory.length,
        health: this.health,
        strength: this.strength,
        agility: this.agility
    };
}

Player.prototype.getInventory = function(){
    return this.inventory.length ? this.inventory : false ;
}



module.exports = Player;