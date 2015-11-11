angular
	.module('app.user')
	.controller('LoginCtrl',LoginCtrl)

function LoginCtrl($window, $state, Login, $mdToast, Restangular) {
	var self = this
	self.login = login
	var user = Restangular.all('auth')
	
	function login(credentials) {
		user.post(credentials)
			.then(getResponse,onErr)
	}
	
	function getResponse(response) {
		if (response.token) {
			$window.localStorage.token = response.token
			Login.isLoggedIn = true
			$state.go('home')
		} else {
			$mdToast.show(
				$mdToast.simple()
					.content('Something went wrong...')
			)
		}
	}
	function onErr(err) {
		$mdToast.show(
			$mdToast.simple()
				.content(err.data)
		)
	}
}
