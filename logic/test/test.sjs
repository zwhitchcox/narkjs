module.exports = test

function test(nark) {
	nark.on('auth added', function() {
		nark.router.get('/logs', nark.auth.isAuth(), function* logs() {
			this.body = [{
					id: 1,
					description: 'Started Job Process!',
					date: new Date() - 60000 * 50
				}, {
					id: 2,
					description: 'Completed Job Process!',
					date: new Date
			}]	
		})
	})
}
