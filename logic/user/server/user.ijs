'use strict'

const _ = require('lodash'),
	SCHEMA = ['email','password'],
	bcrypt = require('co-bcryptjs')

module.exports = assignDependency

function assignDependency() {
	let type = this.thinky.type
	this.User = this.thinky.createModel("users", {
		id:        type.string(),
		email:  type.string(),
		password:  type.string()
	})
	this.User.defineStatic("findByEmail", function *(email) {
		return yield this.filter({email:email})
	})
	this.User.define("hashPassword",function *() {
		let salt = yield bcrypt.genSalt(10)
		this.password =  yield bcrypt.hash(this.password, salt)
	})
	this.User.define("isPassword", function *(password) {
		return yield bcrypt.compare(password, this.password)
	})
}
