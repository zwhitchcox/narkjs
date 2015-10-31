'use strict'
const koa      = require('koa'),
	router       = require('koa-router'),
	serve        = require('koa-static'),
	sendfile     = require('koa-sendfile'),
	thinky       = require('thinky'),
	EventEmitter = require('events').EventEmitter,
	gulp         = require('gulp'),
	debug        = require('gulp-debug'),
	path         = require('path'),
	nodemailer   = require('nodemailer'),
	glob         = require('glob'),
	config       = require('./config')

function Nark(config) {
	if (!(this instanceof Nark)) return new Nark(config)
	EventEmitter.call(this)
	let self         = this
	self.config      = config
	self.app         = koa()
	self.router      = router()
	self.thinky      = thinky(self.config.rethinkdb)
	self.r           = self.thinky.r
	self.type        = self.thinky.type
	self.serve       = serve
	self.sendfile    = sendfile
	self.BASEPATH    = __dirname
	self.transporter = nodemailer.createTransport(config.email)
	// dependency inject nark into
	// all server side js files (sjs)

	// load these first for convenience, not having to emit events
	glob
		.sync(self.BASEPATH+'/logic/{,**/}pre.*.sjs',{realpath:true,cwd:self.BASEPATH})
		.forEach((path) => {console.log('path: ' + path); require.call(self,path)})
	glob
		.sync(self.BASEPATH+'/logic/{,**/}!(pre.)*.sjs',{realpath:true,cwd:self.BASEPATH})
		.forEach(require.call(self,path))
	self.app.listen(4000,console.log('listening on port 4000'))
}
Nark.prototype = Object.create(EventEmitter.prototype)

Nark(config)
