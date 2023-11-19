# Advent of Code

## Create a new solution

Add `index.js` under directory `{year}/{day}` with the following startcode:

```
export class Day {
  constructor(input) {
    this.title = 'Day x: solution title'
    // this.solution1 = '';
    // this.solution2 = '';
  }

  // solution1() { return 'solution1' }
  // solution2() { return 'solution2' }
}
```

and use either strings or functions.

If the solution requires some input data, create a `input.txt` in the same folder with the data.

Use the input variable in the constructor to access it.