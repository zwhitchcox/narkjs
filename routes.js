'use strict'

let marko = require('marko'),
    fs = require('fs'),
    path = require('path')

module.exports = {
    index: index
}

function* index() {
    let scripts = fs.readdirSync('public')
        .reduce(getScriptFileNames,[])
    this.body = marko
        .load('./views/index.marko')
        .stream({
            scripts: scripts
        })
    this.type = 'text/html'
}

function getScriptFileNames(prev,cur) {
    if (path.extname(cur)==='.js') prev.push(cur)
    return prev
}