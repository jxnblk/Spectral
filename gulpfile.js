
var gulp = require('gulp');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync');

var rework = require('gulp-rework');
var rnpm = require('rework-npm');
var rmedia = require('rework-custom-media');
var rvars = require('rework-vars');
var rcalc = require('rework-calc');

gulp.task('compile', function() {
  gulp.src('./src/js/app.js')
    .pipe(browserify())
    .pipe(gulp.dest('./js'));
});

gulp.task('rework', function() {
  gulp.src('./src/css/base.css')
    .pipe(rework(rnpm(), rmedia(), rvars(), rcalc))
    .pipe(gulp.dest('./css'));
});

gulp.task('serve', function() {
  browserSync({ server: { baseDir: './' } , open: false, ghostMode: false });
});


gulp.task('dev', ['compile', 'rework', 'serve'], function() {
  gulp.watch(['./index.html', './src/**/*'], ['compile', 'rework', function() { browserSync.reload(); }]);
});

