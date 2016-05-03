const gulp        = require('gulp');
const browserSync = require('browser-sync').create();
const sass        = require('gulp-sass');
const eslint      = require('gulp-eslint');

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
        .pipe(eslint.failAfterError())
        .pipe(browserSync.stream());
});
// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("app/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.stream());
});
// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'lint'], function() {

    browserSync.init({
        server: "./app"
    });


    gulp.watch("app/js/*js", ['lint']);
    gulp.watch("app/scss/*.scss", ['sass']).on('change', browserSync.reload);
    gulp.watch("app/*.html").on('change', browserSync.reload);
});

gulp.task('default', ['serve']);
