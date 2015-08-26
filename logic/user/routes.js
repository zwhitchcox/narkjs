(function() {
    angular
        .module('app.user')
        .config(config)
    config.$inject = ['$stateProvider']
    function config ($stateProvider) {
        $stateProvider
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
