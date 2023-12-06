export class Day {
  constructor(input) {
    this.title = 'Day 6: Wait For It'

    const [time, distance] = input.split(/\n/).map((row) => row.split(':')[1].split(' ').filter((n) => n).map((n) => Number(n)));

    this.time = time;
    this.distance = distance;
  }

  getWins(time, distance) {
    let wins = 0;
    for (let t = 0; t < time; t += 1) {
      if (t * (time - t) > distance) {
        wins += 1;
      }
    }
    return wins;
  }

  solution1() {
    return this.time.reduce((score, _, index) => {
      let wins = this.getWins(this.time[index], this.distance[index]);
      return score === 0 ? wins : score * wins;
    }, 0);
  }
  
  solution2() {
    return this.getWins(Number(this.time.join('')), Number(this.distance.join('')));
  }
}