'use strict';

var gulp = require('gulp');
var eslint = require('gulp-eslint');

// run eslint on all of our code
gulp.task('eslint', function gulpLint () {
  return gulp.src(['**/*.js', '!node_modules/**/*.js']).pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('default', ['eslint']);
