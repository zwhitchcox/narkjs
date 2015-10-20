(function() {
	angular
		.module('app.user')
		.factory('Login',loginFactory)
	
	loginFactory.$inject = ['$window']
	
	function loginFactory($window) {
		var isLoggedIn;
		if ($window.localStorage.token) {
			isLoggedIn = true
		} else {
			isLoggedIn = false
		}
		return {
			isLoggedIn:    isLoggedIn,
			checkLoggedIn: checkLoggedIn
		}
		function checkLoggedIn() {
			if (!$window.localStorage.token)
				$window.location.href = '/login'
			return ''	
		}
	}
}
