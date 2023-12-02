import * as fs from 'fs';
import * as path from 'path';

const [, , year = 2023, day] = Bun.argv;

if (typeof year !== 'undefined' && typeof day === 'undefined') {
  console.log("         v");
  console.log("        >X<");
  console.log("         A");
  console.log("        d$b");
  console.log("      .d\$$b.");
  console.log("    .d$i$$\$$b.             _    ___ __   __ ___  _  _  _____    ___   ___    ___  ___   ___   ___");
  console.log("       d$$@b              /_\\  |   \\\\ \\ / /| __|| \\| ||_   _|  / _ \\ | __|  / __|/ _ \\ |   \\ | __|");
  console.log("      d\$$$ib             / _ \\ | |) |\\ V / | _| | .` |  | |   | (_) || _|  | (__| (_) || |) || _|");
  console.log("    .d$$$\$$$b           /_/ \\_\\|___/  \\_/  |___||_|\\_|  |_|    \\___/ |_|    \\___|\\___/ |___/ |___|");
  console.log("  .d$$@$$$$\$$ib.");
  console.log(`      d$$i$$b                                           - ${year} -`);
  console.log("     d\$$$$@$b");
  console.log("  .d$@$$\$$$$$@b.");
  console.log(".d$$$$i$$$\$$$$$$b.");
  console.log("        ###");
  console.log("        ###");
  console.log("        ### mh");
  console.log("\n\n");
}

let dirs = [];

try {
  dirs = fs.readdirSync(`./year/${year}`);
} catch (e) {
  console.log(`The year ${year} does not exists.`);
  process.exit();
}

if (typeof day !== 'undefined' && (Number.isNaN(parseInt(day, 10)) || parseInt(day, 10) < 1 || parseInt(day, 10) > 25)) {
  console.log('Please select a valid day. A number between 1-25');
  process.exit();
}

if (day && !dirs.includes(`${day}`)) {
  console.log('That day does not yet exist.');
  console.log(`Maybe you should try and solve it (if problem exists) at: https://adventofcode.com/${year}/day/${day}`);
  process.exit();
}

const runSolutions = async () => {
  const solutions = dirs
    .sort((a, b) => +a - +b)
    .filter((dir) => {
      if (typeof day !== 'undefined' && dir !== `${day}`) {
        return false;
      }
      return fs.existsSync(path.join(`./year/${year}/${dir}`, 'index.js'));
    });

    if (solutions.length === 0) {
      console.log(`Currently, there are no implemented solutions for the year ${year}.`);
    } else {
      if (typeof day === 'undefined') {
        console.log(`Running all days that exists for year ${year}\n`);
      }
    }

    for (const solution of solutions) {
      let input = '';
      if (fs.existsSync(path.join(`./year/${year}/${solution}/input.txt`))) {
        input = await Bun.file(`./year/${year}/${solution}/input.txt`).text();
      }
      const module = await import(`./year/${year}/${solution}/index.js`);
      const m = new module.Day(input);

      console.log(`--- ${m.title} ---\n`);

      if (m && typeof m.solution1 !== 'undefined') {
        const solution1 = typeof m.solution1 === 'function' ? await m.solution1(input) : m.solution1;
        console.log(`Solution 1: ${solution1}`);
      }

      if (m && typeof m.solution2 !== 'undefined') {
        const solution2 = typeof m.solution2 === 'function' ? await m.solution2(input) : m.solution2;
        console.log(`Solution 2: ${solution2}`);
      }

      console.log('');
    }
};

runSolutions();
