import { error, listOptions } from '../utils.js';
import chalk from 'chalk';
import fs from "fs";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
const template = fs.readFileSync(__dirname + '/assets/VueTemplate.txt', 'utf8');

export default async function (args) {
    if(args[0] === 'component') {
        if(!args[1]) {
            return error('No arguments provided!')
        }
        console.log('\n' + chalk.dim(template.replaceAll('#####', args)));
    }

    return listOptions('vue');
}
