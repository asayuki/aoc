export class Day {
    constructor(input) {
        this.title = 'Day 4: Ceres Search';
        this.input = input.split(/\n/).map(line => line.split(''));
    }
  
    findChar(r, c, dr, dc, chars, find) {
        if (r + dr < 0 || c + dc < 0 || r + dr >= this.input.length || c + dc >= this.input[r].length) {
            return 0;
        }
        if (this.input[r + dr][c + dc] === find.split('')[chars.length]) {
            chars.push(this.input[r + dr][c + dc]);

            if (chars.join('') === find) {
                return 1;
            }

            return this.findChar(r + dr, c + dc, dr, dc, chars, find);
        } else {
            return 0;
        }
    }

    solution1() {
        let total = 0;
        for (let r = 0; r < this.input.length; r += 1) {
            for (let c = 0; c < this.input[r].length; c += 1) {
                if (this.input[r][c] === 'X') {
                    for (const [dr, dc] of [[0, -1], [0, 1], [-1, 0], [1, 0], [-1, -1], [1, 1], [-1, 1], [1, -1]]) {
                        total += this.findChar(r, c, dr, dc, ['X'], 'XMAS'); 
                    }
                }
            }
        }

        return total;
    }

    solution2() {
        let total = 0;
        for (let r = 0; r < this.input.length; r += 1) {
            for (let c = 0; c < this.input[r].length; c += 1) {
                if (this.input[r][c] === 'A') {
                    if (
                        ((this.findChar(r, c, -1, -1, ['A'], 'AM') && this.findChar(r, c, 1, 1, ['A'], 'AS')) || (this.findChar(r, c, -1, -1, ['A'], 'AS') && this.findChar(r, c, 1, 1, ['A'], 'AM')))
                        &&
                        ((this.findChar(r, c, 1, -1, ['A'], 'AM') && this.findChar(r, c, -1, 1, ['A'], 'AS')) || (this.findChar(r, c, 1, -1, ['A'], 'AS') && this.findChar(r, c, -1, 1, ['A'], 'AM')))
                    ) {
                        total += 1;
                    }
                }
            }
        }

        return total;
    }
}