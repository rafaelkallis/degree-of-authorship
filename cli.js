#!/usr/bin/env node

const chalk = require('chalk');
const {degreeOfAuthorship} = require('.');

const [,,filename] = process.argv;

if (!filename) {
  console.log(chalk.red('no filename provided!'));
  process.exit(1);
}

console.log(chalk.bgMagenta('   degree of authorship   '));
console.log();

degreeOfAuthorship(process.cwd(), filename)
  .then(scores => {
    let output = Object.entries(scores);
    output.sort(([,a],[,b]) => b-a);
    output = output.map(([author, score]) => `${chalk.magenta(author)} (${score.toFixed(2)})`)
    output = output.join('\n');
    console.log(output);
  })
  .catch(err => {
    console.log(chalk.red('something went wrong'));
    process.exit(1);
  });
