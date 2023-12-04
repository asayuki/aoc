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
      return points += my.filter((n) => winning.indexOf(n) !== -1).reduce((cardPoints, _, pointIndex) => {
        if (typeof copiesOf[index + (pointIndex + 1)] === 'undefined') {
          copiesOf[index + (pointIndex + 1)] = (copiesOf[index] * 1) + 1;
        } else {
          copiesOf[index + (pointIndex + 1)] += copiesOf[index] * 1;
        }
        return pointIndex === 0 ? cardPoints + 1 : cardPoints * 2;
      }, 0);
    }, 0);

    return [points, Object.keys(copiesOf).reduce((t, r) => t + copiesOf[r], 0)];
  }
}