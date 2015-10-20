angular
	.module('app.user')
	.controller('LoginCtrl',LoginCtrl)

LoginCtrl.$inject = ['$window','$state', 'Login','$mdToast','$http']

function LoginCtrl($window, $state, Login, $mdToast, $http) {
	var self = this
	self.login = login

	function login(credentials) {
		$http.post('/auth', credentials)
			.then(getResponse,onErr)
	}
	
	function getResponse(response) {
		if (response.data.token) {
			$window.localStorage.token = response.data.token
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
				.content('Credentials not authenticated')
		)
	}
}
