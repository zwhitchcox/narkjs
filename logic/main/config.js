angular
	.module('app')
	.config(config)
config.$inject = ['$stateProvider']
function config ($stateProvider) {
	
	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'templates/home.html',
			controller: 'HomeCtrl',
			controllerAs: 'home'
		})
}
