angular
	.module('app.user')
	.factory('Login',loginFactory)


function loginFactory($window,$timeout,$state) {
	var isLoggedIn;
	if ($window.localStorage.token) {
		isLoggedIn = true
	} else {
		isLoggedIn = false
	}
	return {
		isLoggedIn:    isLoggedIn,
	}
}
