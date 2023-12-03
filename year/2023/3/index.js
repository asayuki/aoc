export class Day {
  constructor(input) {
    this.title = 'Day 3: Gear Ratio';
    this.input = input.split('\n');
    
    this.solution1 = this.findNumbers(/[^0-9.]/g).reduce((tot, num) => tot += num, 0);
    this.solution2 = this.findNumbers(/\*/g, 2).reduce((tot, [num1, num2]) => tot += (num1 * num2), 0);
  }

  findNumbers(find, reqNumbers = 1) {
    let numbers = [];
    this.input.forEach((row, rowIndex) => {
      for (let [columnIndex, column] of row.split('').entries()) {
        let nums = [];

        if (column.match(find)) {
          for (let r = rowIndex - 1; r <= rowIndex + 1; r += 1) {
            for (let c = columnIndex - 1; c <= columnIndex + 1; c += 1) {
              if (this.input[r][c].match(/[0-9]/)) {
                let numberStartIndex = c;
                while (numberStartIndex >= 0 && !isNaN(parseInt(this.input[r][numberStartIndex - 1]))) {
                  numberStartIndex--;
                }

                let numberEndIndex = c;
                while (numberEndIndex < this.input[r].length && !isNaN(parseInt(this.input[r][numberEndIndex]))) {
                  numberEndIndex++;
                }
                let number = Number(this.input[r].substring(numberStartIndex, numberEndIndex));
                c = numberEndIndex;
                
                nums.push(number);
              }
            }
          }
        }

        if (nums.length >= reqNumbers) {
          if (reqNumbers === 1) {
            numbers.push(...nums);
          } else {
            numbers.push(nums);
          }
        }
      }
    });

    return numbers;
  }
}