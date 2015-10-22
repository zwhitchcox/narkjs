'use strict'
const gulp   = require('gulp'),
	concat     = require('gulp-concat'),
	uglify     = require('gulp-uglify'),
	sourcemaps = require('gulp-sourcemaps'),
	del        = require('del'),
	jade       = require('gulp-jade'),
	spawn      = require('child_process').spawn,
	gutil      = require('gulp-util'),
	header     = require('gulp-header'),
	footer     = require('gulp-footer')

var server;

let paths = {
	scripts: ['logic/!(snippets){,**/}!(*.spec.js)*.js'],
	server:  ['logic/{,**/}!(*.spec.sjs)*.sjs'],
	jade:    ['logic/{,**/}*.jade'],
	other:   ['logic/{,**/}!(*.js|*.sjs|*.jade)']
}
gulp.task('clean', ()=> {
	// ensures port will not be taken up when you quit gulp
	if (typeof server !== 'undefined') { 
		try {
			require('child_process').execSync('kill -9 '+server.pid)
		} catch (e) {
			console.log(e)
		}
		return del(['build'])
		}
})
gulp.task('scripts', ['clean'], ()=> {
	return gulp
		.src(paths.scripts)
		.pipe(sourcemaps.init({
			loadMaps:true
		}))
		.pipe(header('(function () {'))
		.pipe(footer('})();')) 
		.pipe(concat('app.min.js'))
		.pipe(sourcemaps.write('./'))
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
