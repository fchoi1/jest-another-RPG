// New constructor function
class Potion{
    constructor(name){
        this.types = ['health', 'agility', 'strength']
        // If no name is given, chose a random potion coercion and truthy
        this.name = name || this.types[Math.floor(Math.random() * this.types.length)];

        this.name === 'health' ?  
            this.value = Math.floor(Math.random()*10 + 30) :
            this.value = Math.floor(Math.random()*5 + 7);
    }
}

module.exports = Potion;
