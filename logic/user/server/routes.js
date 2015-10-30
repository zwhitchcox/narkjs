'use strict'
const parse  = require('co-body'),
	generatePassword = require('password-generator')

module.exports = main

function main(n) {
	n.router.post('/reset',reset)
	n.router.post('/register',register)

	function* reset() {
		let newPassword = generatePassword()
		let body = yield parse(this)
		let user = yield n.User.findByEmail(body.email)
		
		if (!user.length) {
			this.throw(401, 'Couldn\'t find your email')
		}
		user.password = newPassword
		user.save()
		
	}
}

