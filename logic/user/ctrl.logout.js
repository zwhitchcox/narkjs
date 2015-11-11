angular
	.module('app.user')
	.controller('LogoutCtrl',LogoutCtrl)
function LogoutCtrl($window, Login,$state) {
	delete $window.localStorage.token
	Login.isLoggedIn = false
		$state.go('home')
}
