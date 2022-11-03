import {error, listOptions, log} from '../utils.js';
import shell from 'shelljs';

export default async function ( args ) {
    if( args[ 0 ] === 'dev' ) {
        if ( shell.exec( 'npm ci && npm run dev' ).code !== 0 ) {
            error( 'Error' );
            shell.exit( 1 );
        }
       return log( 'Dev' );
    }

    return listOptions( 'node' );
}
