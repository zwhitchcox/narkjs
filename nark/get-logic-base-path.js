'use strict'
module.exports = main
function main(nark) {
    nark.prototype.LOGIC_PATH       = __dirname+'/logic/'
    nark.prototype.BASE_PATH        = __dirname
    nark.prototype.getLogicBasePath = getLogicBasePath
    // get the path relative to the 'logic' directory
    function getLogicBasePath(fullpath) {
        return fullpath.substr(nark.LOGIC_PATH.length)
    }
}
