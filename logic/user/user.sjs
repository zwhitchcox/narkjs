const _ = require('lodash')

module.exports = assignDependency

function assignDependency(nark) {
	nark.User = User
}

function User(properties) {
	
}
