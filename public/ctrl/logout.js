(function() {
    angular
        .module('app')
        .controller('LogoutCtrl',LogoutCtrl)
    LogoutCtrl.$inject = ['$window', 'Login']
    function LogoutCtrl($window, Login) {
        $window.localStorage.removeItem('token')
        Login.isLoggedIn = false
    }
})()