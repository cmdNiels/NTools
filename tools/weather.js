import Axios from 'axios';
import { listOptions, log } from "../utils.js";

export default async function (args) {
    if(args[0] === 'info') {
        return getWeatherInfo().then((data) => {
            console.log();
            log(JSON.stringify(data), '', '');
            console.log();
        });
    }

    if(args[0] === 'humidity') {
        return getWeatherInfo().then((data) => {
            console.log();
            log(JSON.stringify(data.humidity), '', '');
            console.log();
        });
    }

    if(args[0] === 'temperature') {
        return getWeatherInfo().then((data) => {
            console.log();
            log(JSON.stringify(data.temperature) + '°', '', 'The current temperature in Eindhoven.');
            console.log();
        });
    }

    if(args[0] === 'rain') {
        return getRainInfo().then((data) => {
            console.log();
            console.log(data);
            console.log();
        });
    }

    return listOptions('weather');
}

const getWeatherInfo = () => {
    return new Promise((resolve) => {
        Axios.get('https://data.buienradar.nl/2.0/feed/json').then((response) => {
            const stations = response.data.actual.stationmeasurements;
            for (let station in stations) {
                if(stations[station].regio === 'Eindhoven') {
                    resolve(stations[station]);
                }
            }
        });
    })
}

const getRainInfo = () => {
    return new Promise((resolve) => {
        Axios.get('https://gpsgadget.buienradar.nl/data/raintext/?lat=51.7&lon=5.3').then((response) => {
            const split = response.data.split('\n');
            let stats = [];
            let times = [];

            for(let i in split) {
                stats[i] = split[i].slice(0, 3);
                times[i] = split[i].slice(4, 9);
            }

            let output = '|';
            const rows = 16;
            const cols = 4;

            output += '-'.repeat(stats.length * cols);
            output += '|\n';
            for (let row = 0; row < rows; row++) {
                let r = '|';
                for (let i = 0; i < stats.length; i++) {
                    if(stats[i] >= ((255 / rows) * (rows - row))) {
                        r += '▇'.repeat(cols);
                    } else {
                        r += ' '.repeat(cols);
                    }
                }
                output += r + '|\n';
            }
            output += '|';
            output += '-'.repeat(stats.length * cols);
            output += '|\n';

            let maxWidth = times.length * cols;
            for (let i = 0; i < times.length; i++) {
                if(i === 0) {
                    output += times[i];
                    output += ' '.repeat(((maxWidth - (cols * 5)) / 2) + (cols - 1));
                }
                if(i === Math.ceil(times.length / cols)) {
                    output += times[i];
                    output += ' '.repeat(((maxWidth - (cols * 5)) / 2) + (cols - 1));
                }
                if(i === times.length - 1) {
                    output += times[i- 1];
                    output += ' '.repeat(((maxWidth - (cols * 5)) / 2) + (cols - 1));
                }
            }

            resolve(output);
        });
    })
}

