export class Day {
  constructor(input) {
    this.title = 'Day 10: Pipe Maze';
    this.currentPosition = [0, 0];

    let maze = input.split('\n');
    maze = maze.map((row, index) => {
      if (row.indexOf('S') >= 0) {
        this.currentPosition = [index, row.indexOf('S')];
      }
      return row.split('');
    });

    this.origMaze = JSON.parse(JSON.stringify(maze));
    this.maze = maze;
  }

  getNextPipe = (current, next) => {
    const isVertical = current[0] - next[0];
    const isHorizontal = current[1] - next[1];

    if (isVertical !== 0) {
      if (isVertical === -1) {
        switch (this.maze[next[0]][next[1]]) {
          case '|':
            return [next, [next[0] + 1, next[1]]];
          case 'L':
            return [next, [next[0], next[1] + 1]];
          case 'J':
            return [next, [next[0], next[1] - 1]];
          default:
            break;
        }
      } else {
        switch (this.maze[next[0]][next[1]]) {
          case 'F':
            return [next, [next[0], next[1] + 1]];
          case '7':
            return [next, [next[0], next[1] - 1]];
          case '|':
            return [next, [next[0] - 1, next[1]]];
          default:
            break;
        }
      }
    } else if (isHorizontal !== 0) {
      if (isHorizontal === -1) {
        switch (this.maze[next[0]][next[1]]) {
          case 'J':
            return [next, [next[0] - 1, next[1]]];
          case '-':
            return [next, [next[0], next[1] + 1]];
          case '7':
            return [next, [next[0] + 1, next[1]]];
          default:
            break;
        }
      } else {
        switch (this.maze[next[0]][next[1]]) {
          case '-':
            return [next, [next[0], next[1] - 1]];
          case 'L':
            return [next, [next[0] - 1, next[1]]];
          case 'F':
            return [next, [next[0] + 1, next[1]]];
          default:
            break;
        }
      }
    }

    return [next, next];
  }

  solution1() {
    let currentPosition = JSON.parse(JSON.stringify(this.currentPosition));
    let nextPosition = JSON.parse(JSON.stringify(this.currentPosition));

    if (typeof this.maze[currentPosition[0]][currentPosition[1] + 1] !== 'undefined' && ['-', 'J', '7'].includes(this.maze[currentPosition[0]][currentPosition[1] + 1])) {
      nextPosition[1] += 1;
    } else if (typeof this.maze[currentPosition[0] + 1][currentPosition[1]] !== 'undefined' && ['|', 'L', 'J'].includes(this.maze[currentPosition[0] + 1][currentPosition[1]])) {
      nextPosition[0] += 1;
    } else if (typeof this.maze[currentPosition[0]][currentPosition[1] - 1] !== 'undefined' && ['-', 'F', 'L'].includes(this.maze[currentPosition[0]][currentPosition[1] - 1])) {
      nextPosition[0] -= 1;
    } else if (typeof this.maze[currentPosition[0] - 1][currentPosition[1]] !== 'undefined' && ['|', 'F', '7'].includes(this.maze[currentPosition[0] - 1][currentPosition[1]])) {
      nextPosition[1] -= 1;
    }

    let steps = 0;
    do {
      const [c, n] = this.getNextPipe(currentPosition, nextPosition);
      currentPosition = c;
      nextPosition = n;
      this.maze[currentPosition[0]][currentPosition[1]] = 'X';
      steps += 1;
    } while (this.maze[nextPosition[0]][nextPosition[1]] !== 'X');

    // Visualize it
    this.maze.forEach((row) => console.log(row.join('')));
    this.origMaze.forEach((row) => console.log(row.join('')));

    return steps / 2;
  }

  solution2() {
    return 'Oh crap';
  }
}