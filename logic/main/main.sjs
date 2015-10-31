module.exports = mainRoutes

function mainRoutes() {
	this.on('built', () => {
		this.app.use(this.router.routes())
		this.app.use(this.serve(this.BASEPATH))
		this.app.use(function*(next) {
			// if the request uri ends in .html or .js
			// someone probably is requesting a file
			// that doesn't exist
			ext = this.url.substring(this.url.lastIndexOf('.'))
			if (ext === '.html'|| ext === '.js') {
				this.throw(404)
			}
			yield next
		})
		this.app.use(function*(next) {
			yield* this.sendfile.call(this, this.BASEPATH + '/main/views/index.html')
			if (!this.status) this.throw(404)
		})
		this.app.listen(4000, console.log.bind(this,'App listening on port 4000'))
	})
}
