export class Day {
    constructor(input) {
        this.title = 'Day 5: Cafeteria';
        const [range, ids] = input.split('\n\n');
        this.range = range.split(/\n/).map(range => range.split('-').map(Number));
        this.ids = ids.split(/\n/).map(Number);
    }

    solution1() {
        const between = (x, min, max) => x >= min && x <= max;
        return this.ids.reduce((count, id) => this.range.some(([min, max]) => between(id, min, max)) ? count + 1 : count, 0);
    }

    solution2() {
        this.range.sort((a, b) => a[0] - b[0]);
        let [currentStart, currentEnd] = this.range[0];
        let mergedRanges = [];

        for (let i = 1; i < this.range.length; i++) {
            const [nextStart, nextEnd] = this.range[i];
            if (nextStart <= currentEnd + 1) {
                currentEnd = Math.max(currentEnd, nextEnd);
            } else {
                mergedRanges.push([currentStart, currentEnd]);
                currentStart = nextStart;
                currentEnd = nextEnd;
            }
        }
        mergedRanges.push([currentStart, currentEnd]);

        return mergedRanges.reduce((total, [start, end]) => total + (end - start + 1), 0);
    }
}