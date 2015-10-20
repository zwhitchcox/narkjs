angular
	.module('app.logs')
	.config(config)
config.$inject = ['$stateProvider']
function config ($stateProvider) {
	
	$stateProvider
		.state('cl.logs', {
			url: '/logs',
			templateUrl: 'logs/view.html',
			controller: 'LogsCtrl',
			controllerAs: 'logs'
		})
}
