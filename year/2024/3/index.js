export class Day {
    constructor(input) {
        this.title = 'Day 3: Mull It Over';
        this.input = input.split(/\n/).join('');
    }
  
    solution1() {
        return [...this.input.matchAll(/mul\((\d+),\s*(\d+)\)/g)].reduce((total, match) => total + match[1] * match[2], 0);
    }

    solution2() {
        return [...this.input.replace(/don't\(\).*?(do\(\)|$)/g, '').matchAll(/mul\((\d+),\s*(\d+)\)/g)].reduce((total, match) => total + match[1] * match[2], 0);
    }
  }