// Include gulp
var gulp = require('gulp');
var webserver = require('gulp-webserver');

gulp.task('serve', function() {
    gulp.src('./')
    .pipe(webserver({
      port:8080,
      fallback: 'index.html',
      open: true
    }));
});
 // Default Task
gulp.task('default', ['serve']);