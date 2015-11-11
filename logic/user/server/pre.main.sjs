'use strict'
module.exports = main

function main() {
	let self = this
	require('./user.ijs').call(self)
	require('./auth.ijs').call(self)
}


