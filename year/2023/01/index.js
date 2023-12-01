const stringToNumberMap = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9 };
const stringToNumber = (string) => !isNaN(Number(string)) ? Number(string) : stringToNumberMap[string];
const lookup = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

export class Day {
  constructor(input) {
    this.title = 'Day 1: Trebuchet?!'
    this.input = input.split(/\n/);
  }

  solution1() {
    return this.input.reduce((current, row) => {
      const digits = row.match(/\d/g);
      return Number(`${digits[0]}${digits[digits.length - 1]}`) + current;
    }, 0);
  }

  solution2() {
    return this.input.reduce((current, row) => {
      let matches = [];

      lookup.forEach((item) => {
        let index = row.indexOf(item);
        while (index !== -1) {
          matches[index] = row.substr(index, item.length);
          index = row.indexOf(item, index + 1);
        }
      });

      matches = matches.map(m => stringToNumber(m)).filter(n => n);

      return Number(`${matches[0]}${matches[matches.length - 1]}`) + current;
    }, 0);
  }
}