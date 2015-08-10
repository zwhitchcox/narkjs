'use strict';
let koa    = require('koa'),
    router = require('koa-router')(),
    serve  = require('koa-static'),
    routes = require('./routes'),
    auth   = require('./auth')

let app    = koa()
app.use(serve('public'))
app.use(auth.checkAuth)
app.use(routes.index)

router.post('/auth',auth.authenticate)
app.use(router.routes())

app.listen(3000);