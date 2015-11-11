angular
	.module('app')
	.controller('NavLoginCtrl',NavLoginCtrl)

function NavLoginCtrl(Login) {
	var self = this
	self.state = Login
	
}
