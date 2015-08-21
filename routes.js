'use strict'

let marko = require('marko'),
    fs = require('fs'),
    path = require('path'),
    walkSync = require('./walk').walkSync

module.exports = {
    index: index
}

function* index() {
    let srcs = [],
        srcGen = walkSync('public/',false)
    // get sources for javascript in public folder
    // using a generator
    while (true) {
        let val = srcGen.next()
        srcs.push(val.value)
        if (val.done === true) break;
         
    }
    srcs = srcs.reduce(reduceJS,[])
    // render index page
    this.body = marko
        .load('./views/index.marko')
        .stream({
            srcs: srcs
        })
    this.type = 'text/html'
}


function reduceJS(prev,cur) {
    if (path.extname(cur)==='.js') prev.push(cur)
    return prev
}
