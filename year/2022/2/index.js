const rules = {
    'A': { score: 1, defeats: 'C', defeated_by: 'B' },
    'B': { score: 2, defeats: 'A', defeated_by: 'C' },
    'C': { score: 3, defeats: 'B', defeated_by: 'A'},
}
const decode = {
    'X': { shape: 'A', predicted_result: 'lose' },
    'Y': { shape: 'B', predicted_result: 'draw' },
    'Z': { shape: 'C', predicted_result: 'win' },
};

function calculate_round(opponent, you) {
    return (you === opponent ? 3 : rules[you].defeats === opponent ? 6 : 0) + rules[you].score;
}

function cheat_round(opponent, you) {
    switch (decode[you].predicted_result) {
        case 'lose':
            return calculate_round(opponent, rules[opponent].defeats);
        case 'win':
            return calculate_round(opponent, rules[opponent].defeated_by);
        default:
            return calculate_round(opponent, opponent);
    }
}

export class Day {
    constructor(input) {
      this.title = 'Day 2: Rock Paper Scissors'

      this.solution1 = 0;
      this.solution2 = 0;

      input.split(/\n/).forEach((round) => {
          const [opponent, you] = round.split(' ');
          this.solution1 += calculate_round(opponent, decode[you].shape);
          this.solution2 += cheat_round(opponent, you);
      });
    }
}
