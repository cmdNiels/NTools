#! /usr/bin/env node
import {dirname} from 'path';
import {fileURLToPath} from 'url';

const __dirname = dirname( fileURLToPath( import.meta.url ) );

import fs from "fs";
import chalk from 'chalk';

const tools = JSON.parse( fs.readFileSync( __dirname + '/tools.json', 'utf8' ) );
import y from "yargs";

const yargs = y( process.argv.slice( 2 ) );
import * as utils from './utils.js';

const tool = yargs.argv._[ 0 ];
const args = yargs.argv._.slice( 1 );

if ( tool === undefined || tool === 'help' ) {
    utils.showHelp();
    process.exit( 1 );
}

if ( !tools[ tool ] ) {
    console.log( chalk.red( '\nTool not found!\n' ) );
    utils.showHelp();
    process.exit( 1 );
} else {
    if ( tools[ tool ].options === undefined && !args ) {
        console.log( args );
        utils.listOptions( tool );
        process.exit( 1 );
    }
}

if ( tool === 'version' || tool === 'v' ) {
    console.log();
    utils.showVersion();
    console.log();

    process.exit( 1 );
}

await import( './tools/' + tool + '.js' ).then( async ( module ) => {
    console.log();
    module.default( args );
    console.log();
} );
