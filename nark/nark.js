'use strict'
let koa              = require('koa'),
    router           = require('koa-router'),
    serve            = require('koa-static'),
    getPaths         = require('./get-paths'),
    assignPaths      = require('./assign-paths'),
    routePaths       = require('./route-paths'),
    getLogicBasePath = require('./get-logic-base-path'),
    EventEmitter     = require('events').EventEmitter,
    _                = require('lodash')

module.exports = Nark

function Nark() {
    let self = this
    self = _.assign(self,koa())
    self = _.assign(self,router())
    
    getLogicBasePath (self)
    getPaths         (self)
    assignPaths      (self)
    routePaths       (self)
    
    self.use(self.routes())
    self.use(serve(__dirname+'/lib'))
}
Nark.prototype = _.create(EventEmitter.prototype)