export class Day {
    constructor(rucksacks) {
        this.title = 'Day 3: Rucksack Reorganization';

        this.solution1 = 0;
        this.solution2 = 0;
        let elfGroup = [];
        let i = 0;

        rucksacks.split(/\n/).forEach((rucksack) => {
            // Solution 1
            const c1 = rucksack.slice(0, rucksack.length / 2);
            const c2 = rucksack.slice(rucksack.length / 2);
            const uc = c1.split('').filter(c => c2.split('').indexOf(c) != -1);
            this.solution1 += this.getCharScore(uc[0]);

            // Solution 2
            i += 1;
            elfGroup.push(rucksack);
            if (i % 3 === 0) {
                const uc2 = elfGroup[0].split('').filter(c => elfGroup[1].split('').indexOf(c) != -1 && elfGroup[2].split('').indexOf(c) != -1);
                elfGroup = [];
                i = 0;
                this.solution2 += this.getCharScore(uc2[0]);
            }
        });
    }

    getCharScore(char) {
        const uppercase = char === char.toUpperCase();
        return char.charCodeAt() - (uppercase ? 64 : 96) + (uppercase ? 26 : 0);
    }
};