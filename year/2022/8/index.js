function createTreeGrid(trees) {
  const grid = [];
  trees.split(/\n/).forEach(c => grid.push(c.split('').map(Number)));
  return grid;
}

function findVisibleTrees(grid) {
  let visible = 0;

  for (let y = 0; y < grid.length; y += 1) {
      for (let x = 0; x < grid[y].length; x += 1) {
          const row = grid[y];
          const column = grid.map((c) => c[x]);
          visible += (
              row.slice(0, x).findIndex(n => n >= grid[y][x]) === -1
              || row.slice().reverse().slice(0, (row.length - 1) - x).findIndex(n => n >= grid[y][x]) === -1
              || column.slice(0, y).findIndex(n => n >= grid[y][x]) === -1
              || column.slice().reverse().slice(0, (column.length - 1) - y).findIndex(n => n >= grid[y][x]) === -1
          ) ? 1 : 0
      }
  }

  return visible;
}

function getTreeScore(numbers, height) {
  const index = numbers.findIndex((n) => n >= height);
  return index === -1 ? numbers.length : index + 1;
}

function getHighestTreeScore(grid) {
  const scores = [];
  for (let y = 0; y < grid.length; y += 1) {
      for (let x = 0; x < grid[y].length; x += 1) {
          const row = grid[y];
          const column = grid.map((c) => c[x]);
          scores.push(
              getTreeScore(column.slice().reverse().slice(column.length - y), grid[y][x]) *
              getTreeScore(row.slice(0, x).reverse(), grid[y][x]) *
              getTreeScore(column.slice(y + 1), grid[y][x]) *
              getTreeScore(row.slice(x + 1), grid[y][x])
          );
      }
  }
  return Math.max(...scores);
}

export class Day {
  constructor(input) {
    this.title = 'Day 8: Treetop Tree House'

    this.solution1 = findVisibleTrees(createTreeGrid(input));
    this.solution2 = getHighestTreeScore(createTreeGrid(input));
  }
}