'use strict';
 
var gulp = require('gulp'),
  sass = require('gulp-sass'),
  connect = require('gulp-connect'),
  autoprefixer = require('gulp-autoprefixer'),
  open = require('gulp-open');

var CONSTANTS = {
    PORT_NUMBER: 8888,
    INDEX_FILE: 'index.html',
 }

gulp.task('connect', function() {
    connect.server({
        root: './dist',
        port: CONSTANTS.PORT_NUMBER,
        livereload: true
    });
});

gulp.task('open', function() {
    gulp.src('./dist/' + CONSTANTS.INDEX_FILE)
        .pipe(open({uri: 'http://localhost:' + CONSTANTS.PORT_NUMBER + '/' + CONSTANTS.INDEX_FILE}))
        .pipe(connect.reload());
})
   
gulp.task('html', function () {
    gulp.src('src/*.html')
    .pipe(gulp.dest('./dist/'))
    .pipe(connect.reload());
});

gulp.task('copyData', function () {
    gulp.src('src/data/**/*.*')
    .pipe(gulp.dest('./dist/assets/'))
    .pipe(connect.reload());
    gulp.src('src/*.ico')
    .pipe(gulp.dest('./dist/'))

});
gulp.task('js', function () {
    gulp.src('src/scripts/**/*.js')
    .pipe(gulp.dest('./dist/scripts/'))
    .pipe(connect.reload());
});
   
gulp.task('watch', function () {
    gulp.watch('src/*.html', ['html']);
    gulp.watch('src/data/**/**.*', ['copyData']);
    gulp.watch('src/styles/sass/**/*.scss', ['sass']);
    gulp.watch('src/scripts/**/*.js', ['js']);
});

gulp.task('sass', function () {
  return gulp.src('src/styles/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 3 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload());
});




gulp.task('default', ['html', 'copyData','js','sass','watch','connect', 'open']);