(function() {
	angular
		.module('app')
		.config(config)
	config.$inject = ['$stateProvider']
	function config ($stateProvider) {
		
		$stateProvider
			.state('', {
				url: '/',
				templateUrl: '',
				controller: '',
				controllerAs: ''
			})
	}
})()
