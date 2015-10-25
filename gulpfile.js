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
	footer     = require('gulp-footer'),
	imagemin   = require('gulp-imagemin'),
	pngquant   = require('imagemin-pngquant'),
	debug      = require('gulp-debug')

var server;
let mainTasks = ['jade','other','images','scripts','serve']
let paths = {
	scripts: ['logic/!(snippets){,**/}!(*.spec.js)*.js'],
	jade:    ['logic/{,**/}*.jade'],
	images:  ['logic/{,**/}*.jpg'],
	other:   ['logic/{,**/}!(*.js|*.sjs|*.jade|*.png|*.jpe?g|*.gif)']
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
gulp.task('images', ['clean'], function() {
	return gulp.src(paths.images)
		.pipe(imagemin())
		.pipe(gulp.dest('build'))
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
	gulp.watch(paths.scripts, mainTasks)
	gulp.watch(paths.jade	  , mainTasks)
	gulp.watch(paths.other	, mainTasks)
	gulp.watch(paths.server , mainTasks)
})

gulp.task('serve',['scripts','jade','other'], ()=> {
	server = spawn('node', ['./server.js'], {env:process.ENV,stdio:'inherit'})
})
gulp.task('default', ['watch'].concat(mainTasks))
