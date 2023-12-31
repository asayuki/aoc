export class Day {
  constructor(input) {
    this.title = 'Day 5: Supply Stacks'

    const [stacks, instructions] = input.split(/\n\n/);

    this.solution1 = this.followInstructions(instructions, this.parseStacks(stacks));
    this.solution2 = this.followInstructions(instructions, this.parseStacks(stacks), true);
  }

  parseStacks(stacks) {
    let crates;
    stacks.replace(/\[|\]/g, ' ').split(/\n/).forEach((l, i, s) => {
      if (i === 0) {
        crates = Array.apply(null, Array(s.length)).map(() => []);
      }

      if (i < s.length - 1) {
        const r = l.slice(1).slice(0, -1).match(/.{1,4}/g) ?? [];
        r.forEach((c, i2) => c.trim() !== '' ? crates[i2].unshift(c.trim()) : null);
      }
    });

    return crates;
  }

  followInstructions(instructions, crates, moveMultipleCrates = false) {
    let output = '';
    instructions.split(/\n/).forEach((instruction) => {
      const move = instruction.split(' ').filter((m, i) => [1, 3, 5].includes(i) ? m : null).map(Number).map((n, i) => [1, 2].includes(i) ? n - 1 : n);
      const moving = crates[move[1]].splice(crates[move[1]].length - move[0], crates[move[1]].length);
      crates[move[2]] = [...crates[move[2]], ...(moveMultipleCrates ? moving : moving.reverse())];
    });
    crates.forEach((s) => output += s.pop());
    return output;
  }
}