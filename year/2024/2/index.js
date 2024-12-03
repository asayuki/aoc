export class Day {
    constructor(input) {
        this.title = 'Day 2: Red-Nosed Reports';
        this.input = input.split(/\n/).map(row => row.split(' ').map(Number)).filter((row) => row.every((num, index, arr) => num !== arr[index - 1] && index === 0 ? true : Math.abs(num - arr[index - 1]) <= 3));
    }
  
    solution1() {
        return this.input.reduce((count, row) => row.every((num, index, arr) => index === 0 || num > arr[index - 1]) || row.every((num, index, arr) => index === 0 || num < arr[index - 1]) ? count += 1 : count, 0);
    }

    solution2() {
        // Brainfreeze
    }
}