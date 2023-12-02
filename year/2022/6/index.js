export class Day {
  constructor(input) {
    this.title = 'Day 6: Tuning Trouble';

    this.solution1 = this.findStartOfMarker(input);
    this.solution2 = this.findStartOfMarker(input, 14);
  }

  findStartOfMarker(buffer, distinctCharacters = 4) {
    let position = 0;
    while (position < buffer.length)  {
      if (new Set(buffer.slice(position, position + distinctCharacters)).size === buffer.slice(position, position + distinctCharacters).length) {
        return position + distinctCharacters;
      }

      position += 1;
    }

    return -1;
  }
}
