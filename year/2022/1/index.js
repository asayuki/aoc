export class Day {
  constructor(input) {
    this.title = 'Day 1: Calories counting';

    this.solution1 = this.get_calories(input)[1];
    this.solution2 = this.get_calories(input).slice(0, 3).reduce((a, b) => a + b, 0)
  }

  get_calories(calories) {
    return calories.split(/\n\n/).map(elf => elf.split(/\n/).reduce((a, b) => +a + +b, 0)).sort((a, b) => b - a);
  }
}