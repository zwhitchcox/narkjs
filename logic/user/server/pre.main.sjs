module.exports = main

function main(nark) {
	require('./user.ijs')(nark)
	require('./auth.ijs')(nark)
}


