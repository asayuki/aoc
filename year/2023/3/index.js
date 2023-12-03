export class Day {
  constructor(input) {
    this.title = 'Day 3: Gear Ratio';
    this.input = input.split('\n');
  }

  solution1() {
    let partsSum = 0;

    this.input.forEach((row, rowIndex) => {
      let number = '';
      let numberFirstIndex = '';
      let numberLastIndex = '';

      for (let [columnIndex, column] of row.split('').entries()) {
        if (column.match(/\b\d+\b/)) {
          number += column;
          numberFirstIndex = numberFirstIndex === '' ? columnIndex : numberFirstIndex;

          if (columnIndex === row.length - 1) {
            numberLastIndex = columnIndex;
          }
        }

        if (!column.match(/\b\d+\b/)) {
          if (number !== '') {
            numberLastIndex = columnIndex - 1;
          }
        }

        if (numberFirstIndex !== '' && numberLastIndex !== '') {
          for (let r = ((rowIndex - 1 >= 0) ? rowIndex - 1 : rowIndex); r <= ((rowIndex + 1 <= this.input.length - 1) ? rowIndex + 1 : rowIndex); r += 1) {
            for (let c = ((numberFirstIndex - 1 >= 0) ? numberFirstIndex - 1 : numberFirstIndex); c <= ((numberLastIndex + 1 <= row.length - 1) ? numberLastIndex + 1 : numberLastIndex); c += 1) {
              if (this.input[r][c].match(/[^0-9.]/g)) {
                partsSum += Number(number);
              }
            }
          }

          number = '';
          numberFirstIndex = '';
          numberLastIndex = '';
        }
      }
    });

    return partsSum;
  }

  solution2() {
    let partsSum = 0;

    this.input.forEach((row, rowIndex) => {
      for (let [columnIndex, column] of row.split('').entries()) {
        let first = null;
        let second = null;

        if (column === '*') {
          for (let r = rowIndex - 1; r <= rowIndex + 1; r += 1) {
            for (let c = columnIndex - 1; c <= columnIndex + 1; c += 1) {
              if (this.input[r][c].match(/\b\d+\b/)) {
                let startIndex = c;
                while (startIndex > 0 && !isNaN(parseInt(this.input[r][startIndex - 1]))) {
                  startIndex--;
                }

                let endIndex = c;
                while (endIndex < this.input[r].length && !isNaN(parseInt(this.input[r][endIndex]))) {
                  endIndex++;
                }
                let number = this.input[r].substring(startIndex, endIndex);

                c = endIndex;

                if (first === null) {
                  first = number;
                } else {
                  second = number;
                }
              }
            }
          }
        }

        if (first && second) {
          partsSum += (first * second);
        }
      }
    });

    return partsSum;
  }
}