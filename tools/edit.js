import { listOptions, execute, log } from "../utils.js";

export default async function (args) {

    if(args[0] === 'phpstorm') {
        log('Starting...', '', 'This may take a few moments. Press ^C to exit.');
        return execute('cd ~/ntools && phpstorm .');
    }

    return listOptions('edit');
}
