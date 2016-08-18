
const gulp = require('gulp');
const dest = require('gulp-dest');
const ts = require('gulp-typescript');
const tslint = require('gulp-tslint');
const merge = require('merge2');

const TS_DEFINITIONS = './release/definitions';
const TS_RESULT_DEST = './release/js';
const TS_SOURCE = './src/**/*.ts';
const FIXTURES = './src/**/fixtures/**/*.json';

/** The task for tslint */

gulp.task('lint', function() {
  return gulp.src(['*.ts'])
  .pipe(tslint({
    configuration: {
      rules: {
        'quotemark': 'single',
        'no-trailing-whitespace': false
      }
    }
  }))
  .pipe(tslint.report('verbose'));
});

/** The task for compiling the typescript */

var project = ts.createProject('tsconfig.json');
gulp.task('scripts', function() {

  var results = gulp.src(TS_SOURCE).pipe(ts(project));
  return merge([
    results.dts.pipe(gulp.dest(TS_DEFINITIONS)),
    results.js.pipe(gulp.dest(TS_RESULT_DEST))
  ]);
});

/* The task for copying the json fixtures */
gulp.task('fixtures', function() {
  gulp.src(FIXTURES).pipe(gulp.dest(TS_RESULT_DEST));
});

// Setup the watch event:

gulp.task('watch', function() {
  // setup the typescript task:
  gulp.watch(TS_SOURCE, ['scripts']);
  gulp.watch(FIXTURES, ['fixtures']);
});
