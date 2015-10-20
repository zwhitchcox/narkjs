angular
	.module('app.user')
	.controller('LogoutCtrl',LogoutCtrl)
LogoutCtrl.$inject = ['$window', 'Login','$state']
function LogoutCtrl($window, Login,$state) {
	delete $window.localStorage.token
	Login.isLoggedIn = false
		$state.go('home')
}
