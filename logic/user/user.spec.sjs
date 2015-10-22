'use strict'
const assert = require('assert')
let config = {
		rethinkdb: {
			host: "localhost",
			port: 28015,
			authKey: "",
			db: "test"
		}
	},
	n = require('nark')(config)
require('co-mocha')
describe('User Model testing', function() {
	it('should build node properly', function *(done) {
		n.on('built',done)
	})
	it ('should create a user', function *() {
		let user = new n.User()
		assert.equal(typeof user, 'object')
	})

})
