angular
	.module('app.user')
	.controller('RegisterCtrl',RegisterCtrl)

RegisterCtrl.$inject = ['Restangular','Login']

function RegisterCtrl(Restangular,Login) {
	var self = this
	var user = Restangular.all('register')
	self.register = register
	
	function register(credentials) {
		user.post(credentials)
			.then(getResponse,onError)
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
				.content(err.data)
		)
	}
}
