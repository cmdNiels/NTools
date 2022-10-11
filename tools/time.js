import { listOptions, log } from "../utils.js";

export default async function ( args ) {
    if( args[ 0 ] === 'passed' ) {
        const date = new Date();
        const hoursPassed = formatDigits( date.getHours() - 9 );
        const minutesPassed = formatDigits( date.getMinutes() );
        return log( hoursPassed + ':' + minutesPassed, '', '' );
    }

    if( args[ 0 ] === 'left' ) {
        const date = new Date();
        let hoursPassed = 16 - date.getHours();
        let minutesPassed = 90 - date.getMinutes();
        if( minutesPassed >= 60 ) {
            hoursPassed += 1;
            minutesPassed -= 60;
        }
        log();
        log( formatDigits( hoursPassed ) + ':' + formatDigits( minutesPassed ) + ' Left', '', '' );
        log();
        return;
    }

    if( args[ 0 ] === 'current' ) {
        const date = new Date();
        return log( date.getHours() + ':' + date.getMinutes(), '', '' );
    }

    if( args[ 0 ] === 'progress' ) {
        const endDate = new Date();
        endDate.setHours( 17 );
        endDate.setMinutes( 30 );

        const startDate = new Date();
        startDate.setHours( 9 );
        startDate.setMinutes( 0 );

        const timeWhole = endDate.getTime() - startDate.getTime();
        const timeLeft = endDate.getTime() - new Date().getTime();

        const minutesTotal = Math.floor( timeWhole / ( 1000 * 60 ) );
        const minutesLeft = Math.floor( timeLeft / ( 1000 * 60 ) );
        const progress = Math.floor( ( ( minutesTotal - minutesLeft ) / minutesTotal ) * 100 );

        const leftSide = '▇'.repeat( progress );
        const rightSide = '-'.repeat( 100 - progress );

        return log( leftSide + rightSide + '|' + ' ' + progress + '%', '', '' );
    }

    return listOptions( 'time' );
}

function formatDigits( digits ) {
    if( typeof digits !== 'string' ) {
        digits = digits.toString();
    }
    if( digits.length === 1 ) {
        return '0' + digits;
    }
    return digits;
}
