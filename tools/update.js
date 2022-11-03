import {error, log} from '../utils.js';
import shell from 'shelljs';

export default async function ( args ) {
    log('Updating...', '', '\tYou may need superuser privileges.\n');
    if ( shell.exec( 'sudo npm update -g @cmdniels/ntools > /dev/null 2>&1' ).code !== 0 ) {
        shell.exit( 1 );
        return error( "Error executing 'npm ci'" );
    }
    log('Successfully updated!', '', "Run 'ntools v' to see the current version.");
}
