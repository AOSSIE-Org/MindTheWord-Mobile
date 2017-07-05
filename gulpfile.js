var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    shell = require('gulp-shell'),
    create = require('gulp-cordova-create'),
    plugin = require('gulp-cordova-plugin'),
    android = require('gulp-cordova-build-android'),
    runSequence = require('run-sequence')
	cordova = require('cordova-lib').cordova.raw;


gulp.task('copy-dist', function() {
    return gulp.src('lib/**/*').pipe(gulp.dest('dist/www/'));
});

gulp.task('browserSync', function() {
    gulp.watch("dist/www/**/*").on('change', browserSync.reload);

    browserSync.init({
        server: {
            baseDir: 'dist/www'
        },
    })
})

gulp.task('run-android', function() {
    process.chdir('dist');
    return cordova.run({
        platforms: ['android']
    });
});
gulp.task('update-directory', function() {
    process.chdir('../');
});

gulp.task('watch-android', function() {
    gulp.watch('lib/**/*').on('change', function() {
        runSequence('copy-dist', 'run-android', 'update-directory');
    });
});

gulp.task('watch-browser', ['browserSync'], function() {
    gulp.watch('lib/**/*', ['copy-dist']);
});

gulp.task('build-android', function() {
    process.chdir('dist');
    return cordova.build({
        platforms: ['android']
    });
});

gulp.task('export-apk', function() {
    return gulp.src('dist/platforms/android/build/outputs/apk/*').pipe(gulp.dest('apk'));
});

gulp.task('build', function() {
    runSequence('copy-dist', 'build-android', 'update-directory', 'export-apk');
})