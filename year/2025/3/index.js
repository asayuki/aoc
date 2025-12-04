export class Day {
    constructor(input) {
        this.title = 'Day 3: Lobby';
        this.input = input.split(/\n/).map(line => line.split('').map(Number));
    }

    solution1() {
        return this.input.reduce((largest, numbers) => largest + numbers.reduce((c, n, i) => {
            for (let j = i + 1; j < numbers.length; j += 1) {
                c = Number(`${n}${numbers[j]}`) > c ? Number(`${n}${numbers[j]}`) : c;
            }
            return c;
        }, 0), 0);
    }

    solution2() {
        return this.input.reduce((largest, numbers) => {
            let highestNumberCombination = '';
            let lastIndex = -1;

            for (let k = 0; k < 12; k += 1) {
                let currentHighest = -1;
                let currentIndex = -1;
                for (let i = lastIndex + 1; i < numbers.length - (12 - k - 1); i += 1) {
                    if (numbers[i] > currentHighest) {
                        currentHighest = numbers[i];
                        currentIndex = i;
                    }
                }
                highestNumberCombination += currentHighest;
                lastIndex = currentIndex;
            }

            return largest + Number(highestNumberCombination);
        }, 0);
    }
}