angular
	.module('app.user')
	.factory('Login',loginFactory)

loginFactory.$inject = ['$window','$timeout','$state']

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
