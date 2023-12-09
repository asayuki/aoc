export class Day {
  constructor(input) {
    this.title = 'Day 9: Mirage Maintenance';
    this.reports = input.split(/\n/);
  }

  getNextValues = (report) => {
    return report.reduce((arr, _, i) => {
      if (i === report.length - 1) {
        return arr;
      }

      arr.push(report[i + 1] - report[i]);
      return arr;
    }, []);
  };

  checkReport = (report, reverse = false) => {
    const newReport = [report];

    do {
      newReport.push(this.getNextValues(newReport[newReport.length - 1]));
    } while(!newReport[newReport.length - 1].every(val => val === 0));

    for (let i = newReport.length - 1; i >= 0; i -= 1) {
      if (newReport[i].every(val => val === 0)) {
        newReport[i].push(0)
      } else {
        newReport[i].splice(reverse ? 0 : newReport[i].length, 0, reverse ? newReport[i][0] - newReport[i+1][0] : newReport[i][newReport[i].length - 1] + newReport[i + 1][newReport[i + 1].length - 1]);
      }
    }

    return reverse ? newReport[0].shift() : newReport[0].pop();
  }

  solution1() {
    return this.reports.reduce((value, report) => this.checkReport(report.split(' ').map((num) => Number(num))) + value, 0);
  }

  solution2() {
    return this.reports.reduce((value, report) => this.checkReport(report.split(' ').map((num) => Number(num)), true) + value, 0);
  }
}