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
			templateUrl:'user/views/view.login.html',
			controller:'LoginCtrl',
			controllerAs:'login'
		})
		.state('logout',{
			url:'/logout',
			templateUrl:'user/views/view.logout.html',
			controller:'LogoutCtrl',
			controllerAs:'logout'
		})
		.state('reset',{
			url:'/reset',
			templateUrl:'user/views/view.reset.html',
			controller:'ResetCtrl',
			controllerAs:'reset'
		})
		.state('register',{
			url:'/register',
			templateUrl:'user/views/view.register.html',
			controller:'RegisterCtrl',
			controllerAs:'register'
		})
	}
