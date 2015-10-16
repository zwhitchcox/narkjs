(function() {
    angular
        .module('app',[
            'ngMaterial',
            'ui.router',
						'app.user',
						'app.test'
        ])
	angular
		.module('app.user',[])
	angular
		.module('app.test',[])
})()
