'use strict'
const gulp    = require('gulp'),
	concat      = require('gulp-concat'),
	uglify      = require('gulp-uglify'),
	sourcemaps  = require('gulp-sourcemaps'),
	del         = require('del'),
	marko       = require('gulp-marko')


let paths = {
	scripts: ['logic/**/*.js'],
	server:  ['logic/**/*.sjs'],
	marko:   ['logic/**/*.marko'],
	other:   ['logic/**/*!(.js|.sjs|.marko)']
}
gulp.task('clean', function() {
	return del(['build'])
})
gulp.task('scripts', ['clean'], function() {
	return gulp.src(paths.scripts)
		.pipe(sourcemaps.init())
			.pipe(uglify())
			.pipe(concat('app.js'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('build'))
})
gulp.task('marko', ['clean'],function() {
	gulp.src(paths.marko)
		.pipe(marko())
		.pipe(gulp.dest('build'))
})
gulp.task('other', ['clean'], function() {
	gulp.src(paths.other)
		.pipe(gulp.dest('build'))
})
gulp.task('watch',function() {
	gulp.watch(paths.scripts, ['scripts'])
	gulp.watch(paths.marko  , ['marko'])
	gulp.watch(paths.other  , ['other'])
})

gulp.task('serve', function() {
	let nark = require('./nark')()
	nark.BASEPATH = __dirname + '/build'
	let stream = gulp.src(paths.server, {buffer:false})
		.pipe(nark.serverCode(nark))
		.pipe(gulp.dest('doesntdoanything'))
	stream.on('end',function() {
		nark.emit('built')
	})
})

gulp.task('default', [
	'watch',	
	'scripts',
	'marko',
	'other',
	'serve'
])

