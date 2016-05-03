const gulp        = require('gulp');
const sass        = require('gulp-sass');
const eslint      = require('gulp-eslint');
const electron    = require('electron-connect').server.create();

gulp.task('lint', function () {
    // ESLint ignores files with "node_modules" paths.
    // So, it's best to have gulp ignore the directory as well.
    // Also, Be sure to return the stream from the task;
    // Otherwise, the task may end before the stream has finished.
    return gulp.src(['**/*.js','!node_modules/**'])
        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError());
});
// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("windows/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("windows/css"));
});
// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'lint'], function() {
  // Start browser process
  electron.start();

  // Restart browser process
  gulp.watch('windows/**/js/*.js', ['lint'], electron.restart);
  gulp.watch("windows/**/scss/*.scss", ['sass'], electron.restart);
  // Reload renderer process
  gulp.watch(['main.js', 'windows/**/*.html'], electron.reload);
});

gulp.task('default', ['serve']);
