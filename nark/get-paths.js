'use strict'

let fs = require('fs'),
    path = require('path');
    
module.exports = main

function main(nark) {
    // runs generator to recursively gather all file paths in the logic part of the app
    // for more information, look up javascript generators
    let generator = walkSync(nark.LOGIC_PATH)
    nark.paths = []
    while (true) {
        let val = scriptsGen.next()
        if (val.done === true) break;
        paths.push(val.value)
    }
}

function *walkSync(start) {
    let filenames = fs.readdirSync(start),
        dirs = []
    for (let name of filenames) {
        let abspath = path.join(start, name)
        if (fs.statSync(abspath).isDirectory()) {
            dirs.push(name);
        } else {
            yield (start+name)
        }
    }
    for (let d of dirs) {
        let abspath = path.join(start, d);
        yield* walkSync(abspath+'/');
    }
}