export class Day {
  constructor(input) {
    this.title = 'Day 4: Camp Cleanup'

    this.solution1 = 0;
    this.solution2 = 0;

    input.split(/\n/).forEach((pairs) => {
        const [a1, a2] = pairs.split(',');
        const [a11, a12] = a1.split('-').map(Number);
        const [a21, a22] = a2.split('-').map(Number);

        // Solution 1
        if ((a11 >= a21 && a12 <= a22) || (a21 >= a11 && a22 <= a12)) {
            this.solution1 += 1;
        }

        // Solution 2
        if ((a11 >= a21 && a11 <= a22) || (a12 >= a21 && a12 <= a22) || (a21 >= a11 && a21 <= a12) || (a22 >= a11 && a22 <= a12)) {
            this.solution2 += 1;
        }
    });
  }
}
