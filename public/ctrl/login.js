(function() {
    angular
        .module('hep-rewards')
        .controller('LoginCtrl',LoginCtrl)
    
    LoginCtrl.$inject = ['$window','$state', 'Login','$mdToast','$http']
    
    function LoginCtrl($window, $state, Login, $mdToast, $http) {
        var self = this
        self.login = login

        function login(credentials) {
            $http.post('/auth', credentials)
                .then(getResponse,onErr)
        }
        
        function getResponse(response) {
            $window.localStorage.token = response.token
            Login.isLoggedIn = true
            $state.go('home')
        }
        function onErr(err) {
            $mdToast.show(
                $mdToast.simple()
                    .content('Credentials not authenticated')
            )
        }
    }
})()