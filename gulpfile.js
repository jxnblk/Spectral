
var gulp = require('gulp');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync');
var mincss = require('gulp-minify-css');
var basswork = require('gulp-basswork');

gulp.task('compile', function() {
  gulp.src('./src/js/app.js')
    .pipe(browserify())
    .pipe(uglify())
    .pipe(gulp.dest('./js'));
});

gulp.task('basswork', function() {
  gulp.src('./src/css/base.css')
    .pipe(basswork())
    .pipe(mincss())
    .pipe(gulp.dest('./css'));
});

gulp.task('serve', function() {
  browserSync({ server: { baseDir: './' } , open: false, ghostMode: false, notify: false });
});


gulp.task('dev', ['compile', 'basswork', 'serve'], function() {
  gulp.watch(['./index.html', './src/**/*'], ['compile', 'basswork', function() { browserSync.reload(); }]);
});

