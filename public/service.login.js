(function() {
    angular
        .module('hep-rewards')
        .factory('Login',loginFactory)
    
    loginFactory.$inject = ['$window']
    
    function loginFactory($window) {
        var isLoggedIn;
        if ($window.localStorage.token) {
            isLoggedIn = true
        }
        return {
            isLoggedIn: isLoggedIn
        }
    }
})()