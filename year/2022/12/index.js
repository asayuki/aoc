function heuristic(position0, position1) {
    let d1 = Math.abs(position1.x - position0.x);
    let d2 = Math.abs(position1.y - position0.y);
  
    return d1 + d2;
}

class Tile {
    x;
    y;
    v = 0;
    f = 0;
    g = 0;
    h = 0;
    neighbors;
    parent;

    constructor(x, y, v) {
        this.x = x;
        this.y = y;
        this.v = v;
        this.neighbors = [];
    }

    updateNeighbors(grid, rows, cols) {
        if (this.x < cols) {
            this.neighbors.push(grid[this.y][this.x + 1]);
        }
        if (this.x > 0) {
            this.neighbors.push(grid[this.y][this.x - 1]);
        }
        if (this.y < rows) {
            this.neighbors.push(grid[this.y + 1][this.x]);
        }
        if (this.y > 0) {
            this.neighbors.push(grid[this.y - 1][this.x]);
        }
    }
}

export class Day {
  constructor(input) {
    this.title = 'Day 12: Hill Climbing Algorithm';
    
    this.solution1 = this.findPath(input);
    const solution2 = [];
    // Because I know all my 'a's are at the startingline on each row
    for (let i = 0; i < 41; i += 1) {
      solution2.push(this.findPath(input, i, 0));
    }
    this.solution2 = Math.min(...solution2);
  }
  
  createMap(terrain, forceY = null, forceX = null) {
    const grid = [];
    let startingPoint = null;
    let endPoint = null;
    terrain.split(/\n/).forEach((r, ri) => {
        const row = [];
        r.split('').forEach((c, ci) => {
            if (c === 'S' && forceX === null && forceY === null) {
                startingPoint = new Tile(ci,ri, 1);
                row.push(startingPoint);
            } else if (c === 'E') {
                endPoint = new Tile(ci,ri, 27);
                row.push(endPoint);
            } else {
                if (ri === forceY && ci === forceX) {
                    startingPoint = new Tile(ci,ri, 1);
                    row.push(startingPoint);
                } else {
                    row.push(new Tile(ci,ri, c === 'S' ? 1 : c.charCodeAt(0) - 96));
                }
            }
        });
        grid.push(row);
    });

    const rows = grid.length - 1;
    const cols = grid[0].length - 1;

    grid.forEach((r) => {
        r.forEach((c) => {
            c.updateNeighbors(grid, rows, cols);
        });
    });

    return {
        startingPoint,
        endPoint,
    };
}

  findPath(terrain, forceY = null, forceX = null) {
    const { startingPoint, endPoint } = this.createMap(terrain, forceY, forceX);

    let openSet = [];
    let closedSet = [];
    
    let start = startingPoint;
    let end = endPoint;
    let path = [];

    openSet.push(start);

    while (openSet.length > 0) {
        let lowestIndex = 0;
        for (let i = 0; i < openSet.length; i++) {
          if (openSet[i].f < openSet[lowestIndex].f) {
            lowestIndex = i;
          }
        }
        let current = openSet[lowestIndex];
    
        if (current === end) {
          let temp = current;
          path.push(temp);
          while (temp.parent) {
            path.push(temp.parent);
            temp = temp.parent;
          }
          return path.length - 1;
        }
    
        openSet.splice(lowestIndex, 1);
        closedSet.push(current);
    
        let neighbors = current.neighbors;
    
        for (let i = 0; i < neighbors.length; i++) {
            let neighbor = neighbors[i];
      
            if (!closedSet.includes(neighbor)) {
              let possibleG = neighbor.v > current.v + 1 ? Infinity : current.g + 1;
      
              if (!openSet.includes(neighbor)) {
                openSet.push(neighbor);
              } else if (possibleG >= neighbor.g) {
                continue;
              }
      
              neighbor.g = possibleG;
              neighbor.h = heuristic(neighbor, end);
              neighbor.f = neighbor.g + neighbor.h;
              neighbor.parent = current;
            }
        }
    }
    
    return [];
  }
}