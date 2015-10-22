'use strict'
const koa      = require('koa'),
	router       = require('koa-router'),
	serve        = require('koa-static'),
	sendfile     = require('koa-sendfile'),
	thinky       = require('thinky'),
	EventEmitter = require('events').EventEmitter,
	gulp         = require('gulp'),
	path         = require('path')

module.exports = Nark

function Nark(config) {
	if (!(this instanceof Nark)) return new Nark()
	EventEmitter.call(this)
	let self          = this
		self.config     = config
		self.app        = koa(),
		self.router     = router(),
		self.thinky     = thinky(self.config.rethinkdb)
		self.serve      = serve,
		self.sendfile   = sendfile,
		self.serverCode = require('./server-code')
		self.BASEPATH   = path.normalize(__dirname + '/../..')
	// dependency inject nark into
	// all server side js files (sjs)
	let stream = gulp
		.src([self.BASEPATH+'/logic/{,**/}*.sjs'], {buffer:false})
		.pipe(self.serverCode(nark))
		.pipe(gulp.dest('doesntdoanything'))
	stream.on('end', () => {
		nark.emit('built')
	})
}
Nark.prototype = Object.create(EventEmitter.prototype)
