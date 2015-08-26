'use strict';
let koa    = require('koa'),
    start = require('./logic/main/start'),
    app    = koa()
start(app)
app.listen(4000,()->console.log('app listening on port 4000'))
