export class Day {
    constructor(input) {
        this.title = 'Day 2: Gift Shop';
        this.input = input.split(',').map(range => range.split('-').map(Number));
    }

    solution1() {
        const findRepeats = (start, end) => {
            const seen = new Set();
            for (let i = start; i <= end; i++) {
                if (i < 10 || i.toString().length % 2 !== 0) {
                    continue;
                }
                
                if (i.toString().slice(0, i.toString().length / 2) === i.toString().slice(i.toString().length / 2)) {
                    seen.add(i);
                }
            }

            return seen;
        }

        return this.input.reduce((acc, [start, end]) => acc +  findRepeats(start, end).keys().reduce((tot, num) => tot + num, 0), 0);

    }

    solution2() {
        const findSequenceRepeats = (start, end) => {
            const seen = new Set();
            for (let i = start; i <= end; i++) {
                if (i < 10) {
                    continue;
                }

                const testNum = i.toString().split('');

                if (new Set(testNum).size === 1) {
                    seen.add(i);
                    continue;
                }

                const halfLength = testNum.length / 2;
                
                for (let n = 2; n <= halfLength; n++) {
                    const firstPart = testNum.slice(0, n).join('');
                    for (let repeatCheck = 1; repeatCheck <= halfLength; repeatCheck++) {
                        let repeatedPart = Number(firstPart.repeat(repeatCheck));
                        if (repeatedPart > start && repeatedPart < end) {
                            seen.add(repeatedPart);
                        }
                    }
                }
            }
            return seen;
        }

        return this.input.reduce((acc, [start, end]) => acc +  findSequenceRepeats(start, end).keys().reduce((tot, num) => tot + num, 0), 0);
    }
}