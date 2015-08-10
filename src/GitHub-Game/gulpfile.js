/// <binding BeforeBuild='build' ProjectOpened='watch' />
/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp');
var livereload = require('gulp-livereload');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var iff = require('gulp-if');
var minifyCss = require('gulp-minify-css');
var minifyHtml = require('gulp-minify-html');
var del = require('del');
var inject = require('gulp-inject');
var runSequence = require('run-sequence');

var IS_RELEASE = false;
var DST = './wwwroot/';
var SRC = './';
var SRC_LIB = SRC + 'bower_components/';
var DST_LIB = DST + 'external/';

var JS_LIBS = [
    'angular/angular.js',
    'angular-animate/angular-animate.js',
    'angular-sanitize/angular-sanitize.js',
    'angular-bootstrap/ui-bootstrap-tpls.js',
    'angular-ui-router/release/angular-ui-router.js',
    'angular-local-storage/dist/angular-local-storage.js',
    'angular-toastr/dist/angular-toastr.tpls.js'
];

var CSS_LIBS = [
    'bootswatch/lumen/bootstrap.css',
    'angular-toastr/dist/angular-toastr.css'
];

gulp.task('set-release', function () {
    IS_RELEASE = true;
});

gulp.task('watch', function () {
    livereload.listen();

    gulp.watch(SRC + 'index.html', ['html:index']);
    gulp.watch(SRC + 'html/**/*.html', ['html:views']);
    gulp.watch(SRC + 'js/**/*.js', ['js']);
    gulp.watch(SRC + 'css/**/*.css', ['css']);
});

gulp.task('js', function () {
    return gulp.src(SRC + 'js/**/*.js')
        .pipe(iff(IS_RELEASE, uglify()))
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest(DST))
        .pipe(livereload());
});

gulp.task('css', function () {
    return gulp.src(SRC + 'css/**/*.css')
        .pipe(iff(IS_RELEASE, minifyCss()))
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest(DST))
        .pipe(livereload());
});

gulp.task('html:index', function () {
    var jsLibs = JS_LIBS.map(function (obj) {
        return DST_LIB + obj.substring(obj.lastIndexOf('/'));
    });
    jsLibs.push(DST + 'app.min.js');

    var cssLibs = CSS_LIBS.map(function (obj) {
        return DST_LIB + obj.substring(obj.lastIndexOf('/'));
    });
    jsLibs.push(DST + 'style.min.css');

    var sources = gulp.src(jsLibs.concat(cssLibs), { read: false });

    return gulp.src(SRC + 'index.html')
        .pipe(inject(sources, { ignorePath: 'wwwroot' }))
        .pipe(iff(IS_RELEASE, minifyHtml()))
        .pipe(gulp.dest(DST))
        .pipe(livereload());
});

gulp.task('html:views', function () {
    return gulp.src(SRC + 'html/**/*.html')
        .pipe(iff(IS_RELEASE, minifyHtml()))
        .pipe(gulp.dest(DST + 'html'))
        .pipe(livereload());
});

gulp.task('clean', function () {
    return del([
        DST + '*',
        '!' + DST + '/Web.config'
    ]);
});

gulp.task('copy:js', function () {
    var jsLibs = JS_LIBS.map(function (obj) {
        return SRC_LIB + obj;
    });

    return gulp.src(jsLibs)
        .pipe(gulp.dest(DST_LIB));
});

gulp.task('copy:css', function () {
    var cssLibs = CSS_LIBS.map(function (obj) {
        return SRC_LIB + obj;
    });

    return gulp.src(cssLibs)
        .pipe(gulp.dest(DST_LIB));
});

gulp.task('copy:fonts', function () {
    return gulp.src(SRC_LIB + 'bootstrap/fonts/*')
        .pipe(gulp.dest(DST + 'fonts'));
});

gulp.task('copy:images', function () {
    return gulp.src(SRC + 'img/*')
        .pipe(gulp.dest(DST + 'img'));
});

gulp.task('copy:favicon', function () {
    return gulp.src(SRC + 'favicon.ico')
        .pipe(gulp.dest(DST));
});

gulp.task('copy', ['copy:js', 'copy:css', 'copy:fonts', 'copy:images', 'copy:favicon']);
gulp.task('html', ['html:index', 'html:views']);
gulp.task('build', function () {
    runSequence(
        'clean',
        ['copy', 'js', 'css'],
        'html');
});
gulp.task('release', ['set-release', 'build']);
