export class Day {
  constructor(input) {
    this.title = 'Day 11: Cosmic Expansion';
    this.data = input.split(/\n/).map((r) => r.split(''));
    this.ageExpand = 1;

    this.expandedColumns = this.data[0].reduce((cols, _, i) => this.data.map((row) => row[i]).every((r) => r === '.') ? [...cols, i] : cols, []);
    this.expandedRows = this.data.reduce((rows, r, i) => r.every((c) => c === '.') ? [...rows, i] : rows, []);
    this.galaxies = this.data.flatMap((row, y) => row.map((_, x) => [y, x]).filter(g => this.data[g[0]][g[1]] === '#'));
  }

  findPaths() {
    let path = 0;
    for (let i = 0; i < this.galaxies.length; i += 1) {
      for (let g = (i + 1); g < this.galaxies.length; g += 1) {
        const traveledTroughRows = this.expandedRows.filter((r) => r > this.galaxies[i][0] && r < this.galaxies[g][0]);
        const traveledTroughColumns = this.expandedColumns.filter((c) => c > Math.min(this.galaxies[i][1], this.galaxies[g][1]) && c < Math.max(this.galaxies[i][1], this.galaxies[g][1]));

        const from = this.galaxies[i].slice();
        const to = this.galaxies[g].slice();

        if (traveledTroughRows.length > 0) {
          from[0] -= traveledTroughRows.length * this.ageExpand;
        }
        
        if (traveledTroughColumns.length > 0) {
          from[1] = from[1] + ((from[1] < to[1] ? -traveledTroughColumns.length : traveledTroughColumns.length) * this.ageExpand);
        }

        path += Math.abs(to[0] - from[0]) + Math.abs(to[1] - from[1]);
      }
    }
    return path;
  }

  solution1() {
    return this.findPaths();
  }
  solution2() {
    this.ageExpand = 999999;
    return this.findPaths();
  }
}