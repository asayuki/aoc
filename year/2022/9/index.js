const MOVES = {'L': -1, 'R': 1, 'D': -1, 'U': 1};

class Knot {
    x;
    y;

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    move(direction) {
        if (['U', 'D'].includes(direction.toString())) {
            this.y += MOVES[direction.toString()];
        }
        if (['L', 'R'].includes(direction.toString())) {
            this.x += MOVES[direction.toString()];
        }
    }

    follow(follow) {
        const x = follow.x - this.x;
        const y = follow.y - this.y;

        if (Math.abs(x) > 1 || Math.abs(y) > 1) {
            this.x += Math.abs(x) > 0 ? x / Math.abs(x) : 0;
            this.y += Math.abs(y) > 0 ? y / Math.abs(y) : 0;
        }
    }
}

function countTailPositions(movements, knotLength = 2) {
    const visited = ['0.0'];
    const knots = [];

    for (let k = 0; k < knotLength; k += 1) {
        knots.push(new Knot());
    }

    movements.split(/\n/).forEach((movement) => {
        const [direction, steps] = movement.split(' ');
        for (let s = 0; s < parseInt(steps, 10); s += 1) {
            knots[0].move(direction);

            for (let i = 1; i < knots.length; i += 1) {
                knots[i].follow(knots[i - 1]);
            }

            if (!visited.includes(`${knots[knots.length - 1].x}.${knots[knots.length - 1].y}`)) {
                visited.push(`${knots[knots.length - 1].x}.${knots[knots.length - 1].y}`);
            }
        }
    });
    
    return visited.length;
}

export class Day {
  constructor(input) {
    this.title = 'Day 9: Rope Bridge'

    this.solution1 = countTailPositions(input);
    this.solution2 = countTailPositions(input, 10);
  }
}