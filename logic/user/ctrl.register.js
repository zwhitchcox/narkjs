angular
	.module('app.user')
	.controller('RegisterCtrl',RegisterCtrl)

function RegisterCtrl(Restangular,Login,$mdToast,$window,$state) {
	var self = this
	var user = Restangular.all('register')
	self.register = register
	
	function register(credentials) {
		user.post(credentials)
			.then(getResponse,onErr)
	}

	function getResponse(response) {
	console.log(response)
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
