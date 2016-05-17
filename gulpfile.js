'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var less = require('gulp-less');
var source = require('vinyl-source-stream');
var browserSync = require('browser-sync');

var config = {
	paths: {
		html: './public/*.html',
		js: './public/**/*.js',
		dist: './dist',
		mainJs: './public/app.js'
	}
};

gulp.task('html', function() {
	gulp.src(config.paths.html)
		.pipe(gulp.dest(config.paths.dist));
});

gulp.task('js', function() {
	browserify({
		entries: [config.paths.mainJs],
		debug: true
	})
	.transform(babelify, { presets: ['es2015', 'react'] })
	.bundle()
	.on('error', console.error.bind(console))
	.pipe(source('bundle.js'))
	.pipe(gulp.dest(config.paths.dist + '/scripts'));
});

gulp.task('start', function () {
	browserSync({
        'notify': false,
        'server': {
            'baseDir': [config.paths.dist]
        },
        'ports': {
            'min': 9090,
            'max': 9090
        }
    });
});

gulp.task('watch', function() {
	gulp.watch(config.paths.html, ['html']);
	gulp.watch(config.paths.js, ['js']);
	gulp.watch(config.paths.images, ['images']);
	gulp.watch('./public/styles/**/**/*.less', ['css']);
});

gulp.task('prod', ['html', 'js']);
gulp.task('serve', ['html', 'js', 'start', 'watch']);
