angular
	.module('app.logs')
	.controller('LogsCtrl',LogsCtrl)
LogsCtrl.$inject = ['$http','Restangular']
function LogsCtrl($http,Restangular) {
	
	var self = this
	self.logs = Restangular
		.all('api/logs')
		.getList()
		.then(function(response) {
			self.res = response[0]
		}, function(response) {
			console.log(response)
		})
		
}
