import { dirname } from 'path';
import { fileURLToPath } from 'url';
import {exec} from 'child_process';
const __dirname = dirname(fileURLToPath(import.meta.url));

const tools = JSON.parse(fs.readFileSync(__dirname + '/tools.json', 'utf8'));

import fs from 'fs';
import chalk from 'chalk';

export function showHelp() {
    log('\nUsage:', '', '');
    log('', 'ntools <tool> <option> <arguments>', '');
    log('\nOptions:', '', '');
    Object.keys(tools).map((i) => {
        log('', i, tools[i].description);
    });
    console.log();
}

export function showVersion() {
    const pkg = JSON.parse(fs.readFileSync(__dirname + '/package.json', 'utf8'));
    console.log(chalk.blue('\nv' + pkg.version + '\n\nCreated by cmdNiels'));
    console.log();
}

export function listOptions(tool) {
    log('\nUsage:', 'ntools ' + tool + ' <option> <arguments>', '');
    log('\nOptions:', '', '');
    for (let i = 0; i < tools[tool].options.length; i++) {
        log('', tools[tool].options[i].name, tools[tool].options[i].description);
    }
    console.log();
}

export function log(t1, t2, t3) {
    console.log(chalk.green(t1) + '\t' + t2 + '\t\t' + chalk.dim(t3))
}

export function error(t1) {
    console.log('\n' + chalk.red(t1) + '\n');
}

export function execute(command){
    exec(command);
}
