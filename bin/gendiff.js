#!/usr/bin/env node
import { Command } from 'commander';
import genDiff from '../src/genDiff.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1','-v, --version', 'output the current version')

program
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format <type>', 'output format')
  .action(action);

program.parse();

async function action() {
  const [filepath1, filepath2] = this.args;

  const result = await genDiff(filepath1, filepath2);
  console.log(result);
}