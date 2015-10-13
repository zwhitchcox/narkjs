'use strict'
let koa              = require('koa'),
    router           = require('koa-router'),
    serve            = require('koa-static'),
		sendfile         = require('koa-sendfile'),
    EventEmitter     = require('events').EventEmitter

module.exports = Nark

function Nark() {
	if (!(this instanceof Nark)) return new Nark()
	EventEmitter.call(this)
	let self = this
		self.app        = koa(),
		self.router     = router(),
		self.serve      = serve,
		self.sendfile   = sendfile,
		self.serverCode = require('./server-code')
}
Nark.prototype = Object.create(EventEmitter.prototype)
