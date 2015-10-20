angular
	.module('app.user')
	.run(run)

run.$inject = ['$rootScope','$state']
function run($rootScope, $state) {
	$rootScope.$on('$stateChangeError',onStateChangeError)
	function onStateChangeError(event, toState, toParams, fromState, fromParams, error) {
		if (error.status === 401) {
			$state.go('home')
		}
	}
}
