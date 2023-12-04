export class Day {
  constructor(input) {
    this.title = 'Day 4: Scratchcards';
    this.input = input.split(/\n/).map((row) => {
      const [winning, my] = row.split(': ')[1].split(' | ');
      return [winning.split(' ').filter(n => n), my.split(' ').filter(n => n)];
    });

    const [points, scratchCards] = this.scratchCards();

    this.solution1 = points;
    this.solution2 = scratchCards;
  }

  scratchCards() {
    const copiesOf = {};
    const points = this.input.reduce((points, [winning, my], index) => {
      copiesOf[index] = copiesOf[index] || 1;
      const myWinningNumbers = my.filter((n) => winning.indexOf(n) !== -1);

      let cardPoints = 0;
      for (let i = 0; i < myWinningNumbers.length; i += 1) {
        cardPoints = i === 0 ? 1 : cardPoints * 2;

        if (typeof copiesOf[index + (i + 1)] === 'undefined') {
          copiesOf[index + (i + 1)] = (copiesOf[index] * 1) + 1;
        } else {
          copiesOf[index + (i + 1)] += copiesOf[index] * 1;
        }
      }

      return points += cardPoints;
    }, 0);

    return [points, Object.keys(copiesOf).reduce((t, r) => t + copiesOf[r], 0)];
  }
}