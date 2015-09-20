var gulp = require('gulp');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var cached = require('gulp-cached');
var remember = require('gulp-remember');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var minifyCSS = require('gulp-minify-css');
var notify = require("gulp-notify");

var scriptsGlob = 'src/**/*.js';
var lessGlob = 'src/**/*.less';

gulp.task('scripts', function () {
    return gulp.src(scriptsGlob)
        .pipe(cached('scripts'))
        .pipe(jshint())
        .pipe(remember('scripts'))
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./public/js'));
});

gulp.task('less', function () {
    return gulp.src(lessGlob)
        .pipe(cached('less'))
        .pipe(sourcemaps.init())
        .pipe(less())
        .on('error', notify.onError(function (error) {
            return error.message;
        }))
        .pipe(minifyCSS())
        .pipe(remember('less'))
        .pipe(sourcemaps.write())
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./public/css'))
        .pipe(notify({
            message: "Compiled file: <%= file.relative %>"
        }));
});

gulp.task('default', ['scripts', 'less']);

gulp.task('watch', function () {
    var watcher = gulp.watch(scriptsGlob, ['scripts']);
    watcher.on('change', function (event) {
        if (event.type === 'deleted') {
            delete cached.caches.scripts[event.path];
            remember.forget('scripts', event.path);
        }
    });

    var watcherLess = gulp.watch(lessGlob, ['less']);
    watcherLess.on('change', function (event) {
        if (event.type === 'deleted') {
            delete cached.caches.less[event.path];
            remember.forget('less', event.path);
        }
    });
});