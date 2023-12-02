const evaluate = {
  '+': (x, y) => x + y,
  '*': (x, y) => x * y,
};

class Monkey {
  items;
  inspected;
  operation;
  test;
  monkeyTrue;
  monkeyFalse;

  constructor(about) {
      const [, items, operation, test, monkeyTrue, monkeyFalse] = about.split(/\n/);
      this.items = [...items.matchAll(/\d+/g)].map((num) => +num);
      this.inspected = 0;
      this.operation = operation.split(': ')[1].split('= ')[1].split(' ');
      this.test = +test.match(/\d+/g).pop();
      this.monkeyTrue = +monkeyTrue.match(/\d+/g).pop();
      this.monkeyFalse = +monkeyFalse.match(/\d+/g).pop();
  }

  inspectItems(monkeys, stressedOut) {
      const itemsToInspect = this.items.length;
      const reliefValue = stressedOut ? monkeys.reduce((tot, monkey) => tot === 0 ? monkey.test : tot * monkey.test, 0) : 3;
      for (let i = 0; i < itemsToInspect; i+= 1) {
          const item = this.items.shift();
          let relief = 0;
          if (stressedOut) {
              relief = Math.floor(evaluate[this.operation[1]](+this.operation[0].replace('old', `${item}`), +this.operation[2].replace('old', `${item}`)) % reliefValue);
          } else {
              relief = Math.floor(evaluate[this.operation[1]](+this.operation[0].replace('old', `${item}`), +this.operation[2].replace('old', `${item}`)) / reliefValue);
          }
          this.inspected += 1;
          monkeys[relief % this.test === 0 ? this.monkeyTrue : this.monkeyFalse].items.push(relief);
      }
  }
}

export class Day {
  constructor(input) {
    this.title = 'Day 11: Monkey in the Middle'
    
    this.solution1 = this.monkeyBusiness(input.split(/\n\n/), 20);
    this.solution2 = this.monkeyBusiness(input.split(/\n\n/), 10000, true)
  }

  monkeyBusiness(monkeysSheet, rounds, stressedOut = false) {
    const monkeys = [];
    monkeysSheet.forEach((monkey) => {
        monkeys.push(new Monkey(monkey));
    });
  
    for (let i = 0; i < rounds; i += 1) {
        monkeys.forEach(monkey => monkey.inspectItems(monkeys, stressedOut));
    }
  
    const [top1, top2] = monkeys.sort((a, b) => b.inspected - a.inspected);
    return top1.inspected * top2.inspected;
  }
}