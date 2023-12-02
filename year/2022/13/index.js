export class Day {
  constructor(input) {
    this.title = 'Day 13: Distress Signal';

    this.solution1 = this.getCorrectPairs(input.split(/\n\n/));
    this.solution2 = this.sortedPackets(input.split(/\n\n/));
  }

  compare(p1, p2) {
    if (!p1) {
        return -1;
    } else if (!p2) {
        return 1;
    } else if (Array.isArray(p1) && Array.isArray(p2)) {
        for (let i = 0; i < Math.max(p1.length, p2.length); i += 1) {
            const c = this.compare(p1[i], p2[i]);
            if (c !== 0) {
                return c;
            }
        }
    } else if (Number.isInteger(p1) && Number.isInteger(p2)) {
        if (p1 < p2) {
            return -1;
        } else if (p2 < p1) {
            return 1;
        }
    } else if (Array.isArray(p1) && !Array.isArray(p2)) {
        return this.compare(p1, [p2]);
    } else if (!Array.isArray(p1) && Array.isArray(p2)) {
        return this.compare([p1], p2);
    }

    return 0;
  }

  getCorrectPairs(packets) {
      const correctOrder = [];
      packets.forEach((packet, i) => {
          const [p1, p2] = packet.split(/\n/);
          if (this.compare(JSON.parse(p1), JSON.parse(p2)) < 0) {
              correctOrder.push(i + 1);
          }
      });

      return correctOrder.reduce((a, b) => a === 0 ? b : a + b, 0);
  }

  sortedPackets(packets) {
      let unsorted = [];
      packets.forEach((packet, i) => {
          const [p1, p2] = packet.split(/\n/);
          unsorted.push(JSON.parse(p1), JSON.parse(p2));
      });
      const d = [[[2]], [[6]]]
      return [...unsorted, ...d].sort((a, b) => this.compare(a, b)).reduce((s, v, i) => d.includes(v) ? s === 0 ? i + 1 : s * (i + 1) : s , 0);
  }
}