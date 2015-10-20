module.exports = mainRoutes

function mainRoutes(nark) {
	nark.on('built', () => {
		nark.emit('starting routes')
		nark.app.use(nark.router.routes())
		nark.app.use(nark.serve(nark.BASEPATH))
		nark.app.use(function*(next) {
			// if the request uri ends in .html or .js
			// someone probably is requesting a file
			// that doesn't exist
			ext = this.url.substring(this.url.lastIndexOf('.'))
			if (ext === '.html'|| ext === '.js') {
				this.throw(404)
			}
			yield next
		})
		nark.app.use(function*(next) {
			yield* nark.sendfile.call(this, nark.BASEPATH + '/main/views/index.html')
			if (!this.status) this.throw(404)
		})
		nark.app.listen(4000, console.log.bind(this,'App listening on port 4000'))
	})
}
