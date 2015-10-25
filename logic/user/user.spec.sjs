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

var User;
require('co-mocha')
describe('User Model testing', function() {
	it('should build node properly', function *(done) {
		n.on('built',done)
	})
	it ('should create a user', function *() {
		User = n.User
		let user = new User()
		assert.equal(typeof user, 'object')
		
	})
	it('should store properties passed when instantiated', function*() {
		let username, user
		username = 'zane'
		user = new User({username: username})
		assert.equal(user.username, username)
	})
	it('should assign an id after being saved', function *() {
		let username, password, user
		username = 'zane'
		password = 'password'
		user = new User({username:username,password:password})
		yield user.save()
		assert.notEqual(user.password,password)
	})
})
