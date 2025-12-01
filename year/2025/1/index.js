export class Day {
    constructor(input) {
        this.title = 'Day 1: Secret Entrance';
        this.input= input.split(/\n/).map(line => [line[0], Number(line.slice(1))]);
        this.dialStart = 50;
    }

    solution1() {
        let timesAtZero = 0;
        let dial = this.dialStart;
        for (const [p, n] of this.input) {
            dial = (dial + (p === 'R' ? n : 100 - n)) % 100;
            if (dial === 0) {
                timesAtZero += 1;
            }
        }
        return timesAtZero;
    }

    solution2() {
        let timesAtZero = 0;
        let dial = this.dialStart;
        for (const [p, n] of this.input) {
            for (let i = 0; i < n; i++) {
                dial = (dial + (p === 'R' ? 1 : 99)) % 100;
                if (dial === 0) {
                    timesAtZero++;
                }
            }
        }
        return timesAtZero;
    }
}