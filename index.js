import * as fs from 'fs';
import * as path from 'path';

const [, , year = 2023, day] = Bun.argv;

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

if (typeof day === 'undefined') {
  console.log(`Running all days that exists for year ${year}\n`);
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

    for (const solution of solutions) {
      const module = await import(`./year/${year}/${solution}/index.js`);
      console.log(`==============${solution < 10 ? '=' : '=='}\n Solving day ${solution}\n==============${solution < 10 ? '=' : '=='}`);

      if (module && typeof module.solution1 === 'function') {
        const solution1 = await module.solution1();
        console.log(`Solution 1: ${solution1}`);
      }

      if (module && typeof module.solution2 === 'function') {
        const solution2 = await module.solution2();
        console.log(`Solution 2: ${solution2}`);
      }

      console.log('');
    }
};

runSolutions();
