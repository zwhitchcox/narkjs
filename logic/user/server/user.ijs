'use strict'

const _ = require('lodash'),
	SCHEMA = ['email','password'],
	bcrypt = require('co-bcryptjs')

module.exports = assignDependency

function assignDependency(n) {
	let type = n.thinky.type
	n.User = n.thinky.createModel("users", {
		id:        type.string(),
		email:  type.string(),
		password:  type.string()
	},{
		pk: "email"
	})
	n.User.defineStatic("findByEmail", function *(email) {
		return yield this.filter({email:email})
	})
	n.User.define("hashPassword",function *() {
		let salt = yield bcrypt.genSalt(10)
		this.password =  yield bcrypt.hash(this.password, salt)
	})
	n.User.define("isPassword", function *(password) {
		return yield bcrypt.compare(password, this.password)
	})
}
