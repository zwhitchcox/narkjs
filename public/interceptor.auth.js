(function() {
    angular
        .module('hep-rewards')
        .factory('authInterceptor',authInterceptor)
    
    authInterceptor.$inject=['$window']
    
    function authInterceptor($window) {
        return {
            request: function() {
                
            }
        }
    }
})