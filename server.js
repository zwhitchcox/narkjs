'use strict'
const gulp = require('gulp')

let nark = require('./nark')()
nark.BASEPATH = __dirname + '/build'
// dependency inject nark into
// all server side js files (sjs)
let stream = gulp
	.src(['logic/{,**/}*.sjs'], {buffer:false})
	.pipe(nark.serverCode(nark))
	.pipe(gulp.dest('doesntdoanything'))
stream.on('end', () => {
	nark.emit('built')
})
