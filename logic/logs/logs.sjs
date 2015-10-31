module.exports = logs

function logs() {
	this.router.get('/api/logs', this.auth.isAuth(),function* logs() {
		this.body = [{
				id: 1,
				description: 'Started Job Process!',
			} ,{
				id: 2,
				description: 'Completed Job Process!',
				date: new Date
		}]

	})
}
