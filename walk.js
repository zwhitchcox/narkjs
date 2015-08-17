'use strict'

let fs = require('fs'),
    path = require('path');
    
exports.walkSync = walkSync

function *walkSync (start) {
    let filenames = fs.readdirSync(start),
        dirs = []
    for (let name of filenames) {
        let abspath = path.join(start, name)
        if (fs.statSync(abspath).isDirectory()) {
            dirs.push(name);
        } else {
            yield (start+name).replace(/^public\/?/,'')
        }
    }
    for (let d of dirs) {
        let abspath = path.join(start, d);
        yield* walkSync(abspath+'/');
    }
}