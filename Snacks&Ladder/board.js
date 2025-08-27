class Board {
    constructor() {
        this.snacks = {
            25: 3, 42: 1, 56: 48, 61: 43, 92: 67, 95: 12, 98: 80
        };
        this.ladder = {
            7: 30, 16: 33, 20: 38, 36: 83, 50: 68, 63: 81, 71: 89, 86: 97
        }
    }

    rollDice() {
        return Math.floor(Math.random() * 6) + 1;
    }

    checkPosition(pos) {
        if(pos > 100) return 'NoMove';
        if(this.snacks[pos]){
            return this.snacks[pos];
        }
        if(this.ladder[pos]){
            return this.ladder[pos]
        }
        return pos;
    }
}

module.exports = Board;