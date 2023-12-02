export class Day {
  constructor(input) {
    this.title = 'Day 2: Cube Conundrum'
    this.input = input.split(/\n/);
    this.rules = { red: 12, green: 13, blue: 14 };
  }

  solution1() {
    return this.input.reduce((validGames, game, id) => {
      let valid = true;
      const [, c] = game.split(': ');
  
      c.split(/[;,]+/).forEach((cube) => {
        const [num, color] = cube.trim().split(' ');
        if (num > this.rules[color]) {
          valid = false;
        }
      });

      return valid ? validGames += (id + 1) : validGames;
    }, 0);
  }

  solution2() {
    return this.input.reduce((totalPower, game) => {
      let min = { red: 0, green: 0, blue: 0 };
      const [, c] = game.split(': ');

      c.split(/[;,]+/).forEach((cube) => {
        const [num, color] = cube.trim().split(' ');
        if (Number(num) > min[color]) {
          min[color] = Number(num);
        }
      });

      return totalPower + Object.keys(min).reduce((current, color) => min[color] !== 0 ? current !== 0 ? current * min[color] : current + min[color] : current, 0);
    }, 0);
  }
}