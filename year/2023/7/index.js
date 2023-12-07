export class Day {
  constructor(input) {
    this.title = 'Day 7: Camel Cards';
    this.input = input.split(/\n/).map((r) => r.split(' '));
    this.cardRanking = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
  }

  solution1() {
    const input = this.input.map(([cards, sum]) => [cards, sum, this.getCardValues(cards), Object.keys(this.getCardValues(cards)).length]);
    return input.sort(this.sortCards).reduce((winnings, card, index) => winnings + (Number(card[1]) * (index + 1)), 0);
  }

  solution2() {
    this.cardRanking = ['J', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'Q', 'K', 'A'];
    const input = this.input.map(([cards, sum]) => [cards, sum, this.magicalJokers(this.getCardValues(cards)), Object.keys(this.magicalJokers(this.getCardValues(cards))).length]);
    return input.sort(this.sortCards).reduce((winnings, card, index) => winnings + (Number(card[1]) * (index + 1)), 0);
  }

  getCardValues = (cards) => cards.split('').reduce((values, card) => {
    values[card] = (values[card] || 0) + 1;
    return values;
  }, {});
  
  sortCards = (a, b) => {
    if (a[3] < b[3]) {
      return 1;
    } else if (a[3] === b[3]) {
  
      const ah = Object.keys(a[2]).reduce((t, k) => Math.max(a[2][k], t), 0);
      const bh = Object.keys(b[2]).reduce((t, k) => Math.max(b[2][k], t), 0);
  
      if (ah > bh) {
        return 1;
      }
  
      if (ah === bh) {
        for (let i = 0; i < 5; i += 1) {
          if (this.cardRanking.indexOf(a[0][i]) > this.cardRanking.indexOf(b[0][i])) {
            return 1;
          }
          
          if (this.cardRanking.indexOf(a[0][i]) < this.cardRanking.indexOf(b[0][i])) {
            return -1;
          }
        }
      }
  
      return -1;
    }
  
    return -1;
  }

  magicalJokers = (values) => {
    if (values['J'] && values['J'] !== 5) {
      const numJs = values['J'];
      delete values['J'];

      values[Object.keys(values).reduce((h, c) => {
        if (values[c] > values[h]) {
          return c;
        }

        if (values[c] === values[h]) {
          return this.cardRanking.indexOf(c) > this.cardRanking.indexOf(h) ? c : h;
        }

        return h;
      }, Object.keys(values)[0])] += numJs;
    }

    return values;
  };
}