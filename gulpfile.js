'use strict'
const gulp   = require('gulp'),
	concat     = require('gulp-concat'),
	uglify     = require('gulp-uglify'),
	sourcemaps = require('gulp-sourcemaps'),
	del        = require('del'),
	jade       = require('gulp-jade'),
	spawn      = require('child_process').spawn

var server;

let paths = {
	scripts: ['logic/!(snippets){,**/}*.js'],
	server:  ['logic/{,**/}*.sjs'],
	jade:    ['logic/{,**/}*.jade'],
	other:   ['logic/{,**/}!(*.js|*.sjs|*.jade)']
}
gulp.task('clean', ()=> {
	// ensures port will not be taken up when you quit gulp
	if (typeof server !== 'undefined') 
		require('child_process').execSync('kill -9 '+server.pid)
	return del(['build'])
})
gulp.task('scripts', ['clean'], ()=> {
	return gulp
		.src(paths.scripts)
		.pipe(concat('app.min.js'))
		.pipe(gulp.dest('build'))
})
gulp.task('jade', ['clean'],()=> {
	gulp
		.src(paths.jade)
		.pipe(jade())
		.pipe(gulp.dest('build'))
})
gulp.task('other', ['clean'], ()=> {
	gulp
		.src(paths.other)
		.pipe(gulp.dest('build'))
})
gulp.task('watch',()=> {
	gulp.watch(paths.scripts, ['jade','other','scripts','serve'])
	gulp.watch(paths.jade	  , ['jade','other','scripts','serve'])
	gulp.watch(paths.other	, ['jade','other','scripts','serve'])
	gulp.watch(paths.server , ['jade','other','scripts','serve'])
})
gulp.task('serve',['scripts','jade','other'], ()=> {
	server = spawn('node', ['./server.js'], {env:process.ENV,stdio:'inherit'})
})
gulp.task('default', ['watch','jade','other','scripts','serve'])