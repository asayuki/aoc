export class Day {
  constructor(input) {
    this.title = 'Day 5: If You Give A Seed A Fertilizer';
    this.input = input;
  }

  solution1() {
    const input = this.input.split(/\n\n/);
    const seeds = input.shift().split(': ')[1].split(' ').map((n) => Number(n));
    input.forEach((category) => {
      const instructions = category.split(':\n')[1].split('\n');
      seeds.forEach((seed, index) => {
        for (let i = 0; i < instructions.length; i += 1) {
          const instruction = instructions[i].split(' ').map((n) => Number(n));
          if (seed >= instruction[1] && seed <= instruction[1] + instruction[2] - 1) {
            seeds[index] = (seed - instruction[1]) + instruction[0];
            break;
          }
        }
      })
    });

    return Math.min(...seeds);
  }

  solution2() {
    return 'Could not complete. Code below takes forever or hits memory limit..';

    const input = this.input.split(/\n\n/);
    const seedRange = input.shift().split(': ')[1].split(' ').map((n) => Number(n));
    let seeds = [];
    for (let i = 0; i < seedRange.length; i += 2) {
      for (let n = 0; n < seedRange[i+1]; n += 1) {
        seeds.push(seedRange[i] + n);
      }
    }

    input.forEach((category) => {
      const instructions = category.split(':\n')[1].split('\n');
      seeds.forEach((seed, index) => {
        for (let i = 0; i < instructions.length; i += 1) {
          const instruction = instructions[i].split(' ').map((n) => Number(n));
          if (seed >= instruction[1] && seed <= instruction[1] + instruction[2] - 1) {
            seeds[index] = (seed - instruction[1]) + instruction[0];
            break;
          }
        }
      })
    });

    seeds.sort();
    return seeds[0];
  }
}