export class Day {
    constructor(input) {
        this.title = 'Day 2: Lobby';
        this.input = input.split(/\n/).map(line => line.split('').map(Number));
    }

    solution1() {
        return this.input.reduce((largest, numbers) => largest + numbers.reduce((c, n, i) => {
            for (let j = i + 1; j < numbers.length; j++) {
                c = Number(`${n}${numbers[j]}`) > c ? Number(`${n}${numbers[j]}`) : c;
            }
            return c;
        }, 0), 0);
    }

    solution2() {
    }
}