(function() {
    angular
        .module('hep-rewards')
        .config(config)
    config.$inject = ['$stateProvider','$locationProvider','$httpProvider']
    function config ($stateProvider, $locationProvider, $httpProvider) {
        $locationProvider.html5Mode({
            enabled:     true,
            requireBase: false
        })
        
        $httpProvider.interceptors.push('authInterceptor')
        
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'templates/home.html',
                controller: 'HomeCtrl',
                controllerAs: 'home'
            })
            .state('login', {
                url:         '/login',
                templateUrl: 'templates/login.html',
                controller:  'LoginCtrl',
                controllerAs: 'login'
            })
            .state('logout', {
                url: '/logout',
                templateUrl: 'templates/logout.html',
                controller: 'LogoutCtrl',
                controllerAs: 'logout'
            })
    }
})()
