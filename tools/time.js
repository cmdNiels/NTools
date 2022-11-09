import {error, listOptions, log} from "../utils.js";
import moment from "moment";

export default async function ( args ) {
    if( args[ 0 ] === 'passed' ) {
        if(!args[ 1 ]) {
            return error('No time provided!');
        }
        const startTime = moment(args[ 1 ], 'HH:mm');
        const endTime = moment();
        const dif = moment.duration(endTime.diff(startTime));
        const difference = [formatDigits(dif.hours()), formatDigits(dif.minutes())].join(':');

        return log(difference);
    }

    if( args[ 0 ] === 'left' ) {
        const date = new Date();
        let hoursPassed = 16 - date.getHours();
        let minutesPassed = 90 - date.getMinutes();
        if( minutesPassed >= 60 ) {
            hoursPassed += 1;
            minutesPassed -= 60;
        }
        return log( formatDigits( hoursPassed ) + ':' + formatDigits( minutesPassed ) + ' Left');
    }

    if( args[ 0 ] === 'current' ) {
        return log( moment().format('HH:mm'));
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
