import {error, listOptions, log} from '../utils.js';
import shell from 'shelljs';

export default async function ( args ) {
    if( args[ 0 ] === 'dev' ) {
        if ( shell.exec( 'npm ci > /dev/null 2>&1' ).code !== 0 ) {
            shell.exit( 1 );
            return error( "Error executing 'npm ci'" );
        } else {
            shell.exec('clear');
            log('Running npm dev script now...');
            if(shell.exec('npm run dev').code !== 0 ) {
                return error( "Error executing 'npm run dev'" );
            }
        }
    }

    return listOptions( 'node' );
}
