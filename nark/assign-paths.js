'use strict'
module.exports = main

function main(nark) {
    // assigns each file to its category, based on its path
    function assignFiles(logicpath) {
        let categories = {
            hooks:   [],
            browser: [],
            routes:  [],
            public:  [],
            lib:     []
        }
        return nark.paths.reduce(reduce,categories)
    }
}

function reduce(prev,path) {
    let basename      = path.basename(path),
        logicbasepath = nark.getLogicBasePath(path)
    switch (true) {
        // files starting with 'hook.', 'hooks.', or 'h.' will be registered as hooks
        case /^h(ooks?)?\..*/.test(basename):
            prev.hooks.push(path)
        // anything file named s.routes or named routes.js and is in a
        // a directory of a folder called server will be used to make 
        // the server routes
        case /^s\.routes/.test(basename) 
            || (/.*\/server\/.*/.test(logicbasepath) 
                && /^routes\.js$/.test(basename)):
            prev.routes.push(path)
            break
        // any file with one charcter followed by a dot will not be
        // published. This is a way to separate the server logic from the
        // browser logic. Also, any file within a directory called 'server'
        // or model or models will not be published
        //
        // note you can make a model outside of the server using the file
        // name schema, m.[model name].js
        case /^[a-zA-Z]\..*/.test(basename) 
            || /.*\/(server|models?)\/.*/.test(logicbasepath):
            break
        // all non-server javascript paths will be included in the browser
        // automatically
        case path.extname(basename) === '.js':
            prev.browser.push(basename)
        // all paths not relegated to the server will be available to public
        // view. This means that not specifying a server file will implicitly
        // designate it as a public file
        default:
            prev.public.push(logicbasepath)
            break
            
    }
    return prev
}