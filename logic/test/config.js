(function() {
	angular
		.module('app.test')
		.config(config)
	config.$inject = ['$stateProvider']
	function config ($stateProvider) {
		
		$stateProvider
			.state('logs', {
				url: '/',
				templateUrl: 'test/view.html',
				controller: 'Logs',
				controllerAs: 'logs'
			})
	}
})()
