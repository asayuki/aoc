export class Day {
    constructor(input) {
        this.title = 'Day 4: Printing Department';
        this.input = input.split(/\n/).map(line => line.split(''));
        this.findAdjacentRolls = (input, replace = false) => {
            const adjacent = [
                [-1, -1], [-1, 0], [-1, 1],
                [0, -1], [0, 1],
                [1, -1], [1, 0], [1, 1],
            ]

            let rolls = 0;
            for (let r = 0; r < input.length; r++) {
                for (let c = 0; c < input[r].length; c++) {
                    if (input[r][c] !== '@') {
                        continue;
                    }

                    let rollsAdjacent = 0;
                    for (let a = 0; a < adjacent.length; a++) {
                        const newR = r + adjacent[a][0];
                        const newC = c + adjacent[a][1];

                        if (newR >= 0 && newR < input.length && newC >= 0 && newC < input[r].length) {
                            if (input[newR][newC] === '@') {
                                rollsAdjacent += 1;
                            }
                        }
                    }
                    if (rollsAdjacent <= 3) {
                        rolls += 1;
                        if (replace) {
                            input[r][c] = '.';
                            c = 0;
                            r = 0;
                        }
                    }
                }
            }
            return rolls;
        };
    }

    solution1() {
        return this.findAdjacentRolls(this.input);
    }

    solution2() {
        return this.findAdjacentRolls(this.input, true);
    }
}