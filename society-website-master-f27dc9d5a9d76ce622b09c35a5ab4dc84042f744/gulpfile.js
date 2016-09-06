var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create('EHS Server');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');

gulp.task('default', function(callback) {
	runSequence(['sass', 'browserSync', 'watch'],
		callback);
});

gulp.task('watch', ['browserSync', 'sass'], function() {
	gulp.watch(['app/scss/**/*.scss', '!app/scss/**/*-OLD.scss'], ['sass'])
	gulp.watch(['app/*.html', '!app/*-OLD.html'], browserSync.reload)
	gulp.watch('app/js/**/*.js', browserSync.reload)
});

gulp.task('build', function(callback) {
	runSequence('clean:dist',
		['css', 'useref', 'images', 'fonts'],
		callback);
});

gulp.task('sass', function() {
	sassProcess();
});

gulp.task('css', function() {
	sassProcess();
	return gulp.src('app/css/**/*.css')
		.pipe(gulp.dest('dist/css'))
});

gulp.task('browserSync', function() {
	browserSync.init({
		server: { baseDir: 'app' },
		tunnel: "saborknight",
		reloadOnRestart: true,
		startPath: '/index.html',
		port: 8010
	})
});

gulp.task('useref', function(){
	return gulp.src(['app/*.html', '!app/*-OLD.html'])
		.pipe(useref())
		// Minifies only if it's a JavaScript file
		.pipe(gulpIf('*.js', uglify()))
		// Minifies only if it's a CSS file
		.pipe(gulpIf('*.css', cssnano()))
		.pipe(gulp.dest('dist'))
});

gulp.task('images', function(){
	return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
		.pipe(cache(imagemin({
			// Setting interlaced to true
			interlaced: true
		})))
		.pipe(gulp.dest('dist/images'))
});

gulp.task('fonts', function() {
	return gulp.src('app/fonts/**/*')
		.pipe(gulp.dest('dist/fonts'))
});

gulp.task('clean:dist', function() {
	return del.sync('dist');
});

gulp.task('cache:clear', function (callback) {
	return cache.clearAll(callback);
});

function sassProcess() {
	return gulp.src(['app/scss/**/*.scss', '!app/scss/**/*-OLD.scss'])
		.pipe(sass().on('error', sass.logError)) // Using gulp-sass
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({
			stream: true
	}));
}