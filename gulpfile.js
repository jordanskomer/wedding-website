'use strict';

var        gulp = require('gulp'),
    browserSync = require('browser-sync'),
        nodemon = require('gulp-nodemon'),
           sass = require('gulp-sass'),
   autoprefixer = require('gulp-autoprefixer'),
      minifycss = require('gulp-minify-css'),
         rename = require('gulp-rename'),
     sourcemaps = require('gulp-sourcemaps'),
      gp_concat = require('gulp-concat'),
      gp_uglify = require('gulp-uglify');

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'compact'
};

gulp.task('default', ['watch','browser-sync'], function () {
});

gulp.task('browser-sync', ['nodemon'], function() {
  browserSync.init(null, {
    proxy: "http://localhost:4000",
    files: ["views/**/*.*","public/**/*.*"],
    browser: "google chrome",
    port: 4000,
  });
});

gulp.task('nodemon', function (cb) {
  var started = false;
  // passing Node Environment to set development if running site via gulp
  return nodemon({
    script: './bin/www',
    env: {'NODE_ENV': 'development'}
  }).on('start', function () {
    if (!started) {
      cb();
      started = true;
    }
  });
});

var scss_input = './public/stylesheets/scss/style.scss';
var css_output = './public/stylesheets/css/';

gulp.task('sass', function () {
  return gulp
    .src(scss_input)
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: [
        'last 2 versions',
        'android 4',
        'opera 12'
      ]
    }))
    .pipe(gulp.dest(css_output))
    .pipe(browserSync.reload({stream:true}));
});

// gulp.task('scripts', function(){
//     return gulp.src([
//       './bower_components/jquery/dist/jquery.min.js',
//       './bower_components/mediaelement/build/mediaelement-and-player.min.js',
//       './bower_components/bootstrap-sass/assets/javascripts/bootstrap.js',
//       './bower_components/bootstrap-sass/assets/javascripts/bootstrap-sprockets.js',
//       './bower_components/plyr/dist/plyr.js',
//       './bower_components/parallax.js/parallax.min.js',
//       './bower_components/masonry/dist/masonry.pkgd.js',
//       './bower_components/jquery.scrollTo/jquery.scrollTo.min.js',
//       './public/javascripts/main.js'])
//         .pipe(gp_concat('concat.js', {newLine: ';'}))
//         .pipe(gulp.dest('./public/javascripts'));
// });

gulp.task('watch', function() {
    // Watch the scss_input folder for change,
    // and run `sass` task when something happens
    gulp.watch('./public/stylesheets/scss/**/*.scss', ['sass']);
    gulp.watch('./public/stylesheets/scss/**/**/*.scss', ['sass']);
    gulp.watch('./public/javascripts/main.js', ['scripts']);
    // When there is a change,
    // log a message in the console
    gulp.on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});
