angular
	.module('app.logs')
	.config(config)
config.$inject = ['$stateProvider']
function config ($stateProvider) {
	
	$stateProvider
		.state('logs', {
			url: '/logs',
			templateUrl: 'logs/view.html',
			controller: 'LogsCtrl',
			controllerAs: 'logs',
			resolve: {
				zane: ['Login','$state',function(Login,$state) {
					if (!Login.isLoggedIn) {
						$state.go('home')
					}
					return ''
				}]
			}
		})
}
