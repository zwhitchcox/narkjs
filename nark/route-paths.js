'use strict'

module.exports = main

function main(nark) {
    paths
        .hooks
        .forEach(registerHooks)
    paths
        .browser
        .map(getBrowserScripts)
    nark.emit('route:api:start')
    paths
        .routes
        .forEach(getModuleRoutes)
    nark.emit('route:files:start')
    paths
        .public
        .forEach(getPublicRoutes)
    nark.emit('route:stop')
    
    // before the app routes anything, you can register hooks
    // these are event listeners, so you can wait for a specific event
    // to execute your code. this is helpful particularly with the router
    // if you need to add routes/logic in a particular order
    function registerHooks(path) {
        require(path)(nark)
    }
    // gather all the routes, so they can be injected
    // into the browser by marko. this is just an added convenience
    // so developers don't have to manually add each script source to
    // the browser.
    function getBrowserScripts(path) {
        let logicpath = nark.getLogicBasePath(path),
            modname   = /[^/]+/.exec(logicpath),
            modmatch  = new RegExp('/public'),
            route     = logicname.replace(modmatch,modname)
        return route
    }
    // get all routes provided by the modules in their directories
    // the routing is actually done by the modules. this just injects
    // the dependencies
    function getModuleRoutes(path) {
        require(path)(nark)
    }
    // get all routes accessible to the public
    // routes are based on their file path
    // module/directory/public/index.html becomes
    // module/directory/index.html, because the 'public' directory
    // is redundant, since it is already user-facing
    function getPublicRoutes(path) {
        let logicpath = getLogicBasePath(path),
            modname   = /[^/]+/.exec(logicpath),
            modmatch  = new RegExp('/public'),
            route     = logicpath.replace(modmatch,modname)
        router.get(route,function(next) {
            yield * sendfile.call(this, path)
        })
        router.get(logicpath,function(next) {
            yield * sendfile.call(this, path)
        })
    }
}