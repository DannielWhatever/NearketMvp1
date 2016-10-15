var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var ngAnnotate = require('gulp-ng-annotate');
var del = require('del');
var plumber = require("gulp-plumber");

var paths = {
  sass: ['./src/scss/**/*.scss'],
  js: ['./src/js/**/*.js']
};

gulp.task('default', ['sass','babel']);



gulp.task('watch', function() {
  gulp.watch(paths.js, ['babel']);
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }

  done();
});

//mis-conciertos

gulp.task('sass', function(done) {
  return gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    //.on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    /*.pipe(minifyCss({
      keepSpecialComments: 0
    }))*/
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'));
  //.on('end', done);
});

gulp.task('clean', function(){
  //del(['./www/dist/**/*']);
});

gulp.task('babel',['clean'], function () {
  return gulp.src(paths.js)
    //.pipe(plumber())
    //.pipe(ngAnnotate())
    .pipe(sourcemaps.init())
    .pipe(babel({presets: ['es2015']}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest("./www/dist"));
});



gulp.task('build', ['sass','babel','watch']);
