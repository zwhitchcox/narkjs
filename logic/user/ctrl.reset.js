angular
	.module('app.user')
	.controller('ResetCtrl',ResetCtrl)


function ResetCtrl(Restangular) {
	var self = this
	var user = Restangular.all('reset')
	self.reset = reset
	
	function reset(email) {
		user.post(email)
			.then(getResponse,onErr)
	}

	function getResponse(response) {
			$mdToast.show(
				$mdToast.simple()
					.content('Password has been reset and emailed to you')
			)
	}
	function onErr(err) {
		$mdToast.show(
			$mdToast.simple()
				.content(err.data)
		)
	}
}
