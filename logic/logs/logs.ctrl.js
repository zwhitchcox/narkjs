'use strict'

angular
	.module('app.logs')
	.controller('LogsCtrl',LogsCtrl)
function LogsCtrl($http,Restangular) {
	
	let self = this
	self.logs = Restangular
		.all('api/logs')
		.getList()
		.then(function(response) {
			self.res = response[0]
		}, function(response) {
			console.log(response)
		})
		
}
