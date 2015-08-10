'use strict';
let koa    = require('koa'),
    router = require('koa-router')(),
    serve  = require('koa-static'),
    parse  = require('co-body'),
    jwt    = require('jsonwebtoken'),
    mount  = require('koa-mount'),
    routes = require('./routes'),
    auth   = require('./auth')

let app    = koa()
app.use(serve('/public'))
app.use(auth.checkAuth)
router.get('/partials/:views',routes.partials)
router.get(/^(?!(\/api|\/partials))(.*\.(?!(html|js)$))?[^.]*$/, routes.index)
router.post('/auth',routes.authenticate)
app.use(router.routes())
app.listen(3000)