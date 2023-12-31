export class Day {
  constructor(input) {
    this.title = 'Day 10: Cathode-Ray Tube';
    this.input = input;

    const { sum1, letters } = this.runProgram();

    this.solution1 = sum1;
    this.solution2 = letters;
  }

  runProgram() {
    let sum1 = '';
    let letters = '';
    let x = 1;
    let cycle = 0;
    
    const cycleValues = [];
    const sprite = Array.apply(0, Array(6)).map(() => Array.apply(0, Array(40)).map(() => '.'));
  
    function everyCycle() {
      const row = Math.floor(cycle / 40);
      const position = Math.abs(cycle - (40 * row));
      if ([position - 1, position, position + 1].includes(x)) {
        sprite[row][position] = '#';
      }
  
      cycle += 1;
      if ([20, 60, 100, 140, 180, 220].includes(cycle)) {
        cycleValues.push(cycle * x);
      }
    }
  
    this.input.split(/\n/).forEach((line) => {
      if (line === 'noop') {
        everyCycle();
      } else {
        const [, value] = line.split(' ');
        for (let i = 0; i < 2; i += 1) {
          everyCycle();
          if (i === 1) {
            x += +value;
          }
        }
      }
    });
  
    sum1 = cycleValues.reduce((a, b) => a + b, 0)
    sprite.forEach((l) => letters += `\t${l.join('', '')}\n`);
  
    return {
      sum1,
      letters: `\n${letters}`,
    };
  }
}