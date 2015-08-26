'use strict'
module.exports = route

function route(nark) {
    nark.on('route:stop', routeIndex)
    function routeIndex() {
        app.use(route())
    }
    function*route(browserscriptssrscs) {
        // render index page
        this.body = marko
            .load('./views/index.marko')
            .stream({
                srcs: nark.paths.browser
            })
        this.type = 'text/html'
    }
}
