'use strict'

module.exports = mainRoutes

function mainRoutes() {
	let nark = this
	nark.on('built', () => {
		nark.app.use(nark.router.routes())
		nark.app.use(nark.serve(this.BASEPATH+'/build'))
		nark.app.use(function*(next) {
			// if the request uri ends in .html or .js
			// someone probably is requesting a file
			// that doesn't exist
			let ext = this.url.substring(this.url.lastIndexOf('.'))
			if (ext === '.html'|| ext === '.js') {
				this.throw(404)
			}
			yield next
		})
		nark.app.use(function*(next) {
			let indexPage =  nark.BASEPATH + '/logic/index.html'
			yield* nark.sendfile.call(this,indexPage)
			if (!this.status) this.throw(404)
		})
		nark.app.listen(4000, console.log.bind(null,'App listening on port 4000'))
	})
}
