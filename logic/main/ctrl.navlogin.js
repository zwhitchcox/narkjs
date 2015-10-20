angular
	.module('app')
	.controller('NavLoginCtrl',NavLoginCtrl)

NavLoginCtrl.$inject = ['Login']

function NavLoginCtrl(Login) {
	var self = this
	self.state = Login
	
}
