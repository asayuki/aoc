export class Day {
    constructor(input) {
        this.title = 'Day 1: Historian Hysteria';
        this.input = input.split(/\n/).map(row => row.split('   '));
        this.leftList = this.input.map(([left]) => left).sort();
        this.rightList = this.input.map(([, right]) => right).sort();
    }
  
    solution1() {
        return this.leftList.reduce((distance, num, index) => distance += Math.abs(num - this.rightList[index]), 0);
    }
    
    solution2() {
        return this.leftList.reduce((score, left) => score += left * this.rightList.filter((right) => right === left).length, 0);
    }
  }