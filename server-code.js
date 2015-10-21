'use strict'
let koa        = require('koa'),
	router       = require('koa-router'),
	serve        = require('koa-static'),
	sendfile     = require('koa-sendfile'),
	thinky       = require('thinky'),
	EventEmitter = require('events').EventEmitter,
	gulp = require('gulp')

module.exports = Nark

function Nark(config) {
	if (!(this instanceof Nark)) return new Nark()
	EventEmitter.call(this)
	let self          = this,
		self.config     = config
		self.app        = koa(),
		self.router     = router(),
		self.thinky     = thinky(self.config.rethinkdb)
		self.serve      = serve,
		self.sendfile   = sendfile,
		self.serverCode = require('./server-code'),
}
Nark.prototype = Object.create(EventEmitter.prototype)
