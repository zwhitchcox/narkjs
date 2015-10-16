(function() {
	angular
		.module('app.test')
		.controller('LogsCtrl',LogsCtrl)
	LogsCtrl.$inject = ['$http']
	function LogsCtrl($http) {
		var self = this
		$http.get('/logs')
			.then(getResponse,onErr)
		function getResponse(response) {
			console.log(response)
		}
		function onErr(err) {
			console.log(err)
		}
	}
})()
