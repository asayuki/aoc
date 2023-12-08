const gcd = (a, b) => !b ? a : gcd(b, a % b);
const lcm = (a, b) => (a * b) / gcd(a, b);

export class Day {
  constructor(input) {
    this.title = 'Day 8: Haunted Wasteland';
    const [instructions, ...network] = input.split(/\n/);
    this.instructions = instructions.split('');
    network.shift();
    this.network = network.reduce((net, bit) => {
      const [destination, goto] = bit.split(' = ');
      const [left, right] = goto.split(', ');

      return ({
        ...net,
        [destination]: {
          L: left.replace('(', ''),
          R: right.replace(')', ''),
        },
      });
    }, {});
  }

  solution1() {
    let currentPosition = 'AAA';
    
    for (let i = 0, steps = 1; i < this.instructions.length; i += 1, steps += 1) {
      currentPosition = this.network[currentPosition][this.instructions[i]];
      if (currentPosition === 'ZZZ') {
        return steps;
      }

      if (i === this.instructions.length - 1) {
        i = -1;
      }
    }
  }

  solution2() {
    const startingPoints = Object.keys(this.network).filter(point => point.endsWith('A'));
    const cycleLengths = startingPoints.map((start) => {
      let currentPoint = start;
      let steps = 0;

      do {
        const instruction = this.instructions[steps % this.instructions.length];
        currentPoint = this.network[currentPoint][instruction];
        steps += 1;
      } while(!currentPoint.endsWith('Z'));

      return steps;
    });

    return cycleLengths.reduce((a, b) => lcm(a, b));
  }
}