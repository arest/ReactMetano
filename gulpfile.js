var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var notifier = require('node-notifier');
var server = require('gulp-server-livereload');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var watch = require('gulp-watch');

var Del    = require('del');
var Rename = require('gulp-rename');
var argv = require('yargs').argv;

/**
 * Build Settings
 */
var settings = {
  /*
   * Environment to build our application for
   * 
   * If we have passed an environment via a
   * CLI option, then use that. If not attempt
   * to use the NODE_ENV. If not set, use production.
   */
  environment : (!!argv.env
                  ? argv.env
                  : process.env.NODE_ENV || 'production'),
  /*
   * Where is our config folder?
   */
  configFolder : './config',
  /*
   * Where are we building to?
   */
  buildFolder  : './src'
};

var notify = function(error) {
  var message = 'In: ';
  var title = 'Error: ';

  if(error.description) {
    title += error.description;
  } else if (error.message) {
    title += error.message;
  }

  if(error.filename) {
    var file = error.filename.split('/');
    message += file[file.length-1];
  }

  if(error.lineNumber) {
    message += '\nOn Line: ' + error.lineNumber;
  }

  notifier.notify({title: title, message: message});
};

var bundler = watchify(browserify({
  entries: ['./src/app.jsx'],
  transform: [reactify],
  extensions: ['.jsx'],
  debug: true,
  cache: {},
  packageCache: {},
  fullPaths: true
}));

function bundle() {
  return bundler
    .bundle()
    .on('error', notify)
    .pipe(source('main.js'))
    .pipe(gulp.dest('./'))
}
bundler.on('update', bundle)

gulp.task('build', function() {
  bundle()
});

gulp.task('serve', function(done) {
  gulp.src('')
    .pipe(server({
      livereload: {
        enable: true,
        filter: function(filePath, cb) {
          if(/main.js/.test(filePath)) {
            cb(true)
          } else if(/style.css/.test(filePath)){
            cb(true)
          }
        }
      },
      open: true
    }));
});

gulp.task('sass', function () {
  gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./'));
});

/**
 * Config Task
 *
 * Get the configuration file, rename it 
 * and move it to be built.
 */
gulp.task('config', function() {  
  //console.log( settings.environment);
  //console.log( settings.configFolder);
  return gulp.src(settings.configFolder + '/' + settings.environment + '.js')
             .pipe(Rename('config.js'))
             .pipe(gulp.dest(settings.buildFolder));
});

gulp.task('default', ['build', 'serve', 'sass', 'watch']);

gulp.task('watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});
