'use strict'
let views = require('co-views')

let render = views('public', {default:'jade'})

module.exports = {
    index:        index,
    partials:     partials
}

function* index() {
    this.body = yield render('index')
}

function* partials() {
    this.body = yield render('partials.'+this.params.view)
}