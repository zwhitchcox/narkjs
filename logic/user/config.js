angular
	.module('app.user')
	.config(config)
config.$inject = ['$stateProvider','$locationProvider','$httpProvider','$provide']
function config ($stateProvider, $locationProvider, $httpProvider,$provide) {
	$locationProvider.html5Mode({
		enabled:	 true,
		requireBase: false
	})
	
	$provide.factory('authInterceptor',authInterceptor)

	authInterceptor.$inject=['$window']
	
	function authInterceptor($window) {
		return {
			request: function(config) {
				if ($window.localStorage.token) {
					config.headers.Authorization = 'Bearer ' + $window.localStorage.token
				}
				return config
			}
		}
	}
	
	$httpProvider.interceptors.push('authInterceptor');
	$stateProvider
		.state('cl', {
			abstract:true,
			template: '<ui-view/>',
			resolve: {
				loggedin: ['$window','$timeout','$state',
					function($window,$timeout,$state) {
						if (!$window.localStorage.token)
							$timeout(function() {
								$state.go('login')
							})
						return ''
					}
				]
			}
		})
		.state('login',{
			url:'/login',
			templateUrl:'user/view.login.html',
			controller:'LoginCtrl',
			controllerAs:'login'
		})
		.state('logout',{
			url:'/logout',
			templateUrl:'user/view.logout.html',
			controller:'LogoutCtrl',
			controllerAs:'logout'
		})
	}
