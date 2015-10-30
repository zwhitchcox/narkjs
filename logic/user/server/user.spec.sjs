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
		let user = new User({email:'zane',password:'password'})
		assert.equal(typeof user, 'object')
	})
	it('should store properties passed when instantiated', function*() {
		let email, user
		email = 'zane'
		user = new User({email: email})
		assert.equal(user.email, email)
		user.delete()
	})
	it('should assign an id after being saved', function *() {
		let email, password, user
		email = 'zane'
		password = 'password'
		user = new User({email:email,password:password})
		yield user.save()
		assert(user.id)
		user.delete()
	})
	it('should find a saved user by email', function *() {
		let email, password, user
		email = 'zane'
		password = 'hello'
		user     = User({email:email,password:password})
		yield user.save()
		let foundUser = yield User.findByEmail(email)
		assert.equal(foundUser[0].email,email)
		user.delete()
	})
	it('should have a hashed password after being saved', function *() {
		let email, password, user
		email = 'zane'
		password = 'whatthewaht'
		user     = new User({email:email,password:password})
		yield user.hashPassword()
		yield user.save()
		assert.notEqual(user.password,password)
		user.delete()
	})
	it('should validate a correct password', function *() {
		let user, email, password;
		email = 'zane'
		password = '123456'
		user = n.User({email: email, password: password})
		yield user.hashPassword()
		yield user.save()
		assert(yield user.isPassword(password))
		user.delete()
	})
	it('should not validate an incorrect password', function *() {
		let user, email, password;
		email = 'zane'
		password = '123456'
		user = n.User({email: email, password: password})
		yield user.hashPassword()
		yield user.save()
		assert(!(yield user.isPassword('wrongpassword')))
		user.delete()
	})
})
