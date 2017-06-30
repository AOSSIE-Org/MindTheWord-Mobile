var gulp = require('gulp'),
    jspm = require('gulp-jspm'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync').create(),
    shell = require('gulp-shell'),
    gutil = require('gulp-util'),
    create = require('gulp-cordova-create'),
    plugin = require('gulp-cordova-plugin'),
    android = require('gulp-cordova-build-android'),
    runSequence = require('run-sequence'),
	cordova = require('cordova-lib').cordova.raw,
    Multistream = require('multistream'),
    packageJson = require('./package.json')
    fs = require('fs'),
    args   = require('yargs').argv
    exec = require('child_process').exec;



gulp.task('copy-dist', function() {
    return gulp.src('lib/**/*').pipe(gulp.dest('dist/www/'));
});

gulp.task('browserSync', function() {
    gulp.watch("www/**/*").on('change', browserSync.reload);

    browserSync.init({
        server: {
            baseDir: 'dist/www'
        },
    })
})



gulp.task('cordova-build-android',function(){
    return cordova.build({
        platforms: ['android']
    });
});


gulp.task('run-android', function() {
    exec('taco run android --livereload');
});

gulp.task('build-android', function() {
    runSequence('cordova-build-android','export-apk');
});



gulp.task('watch-android', ['run-android'],function() {
    gulp.watch('lib/**/*').on('change', function() {
        runSequence('copy-dist', 'run-android');
    });
});

gulp.task('watch-browser', ['browserSync'], function() {
    gulp.watch('lib/**/*', ['copy-dist']);
});

gulp.task('watch',['bundle-options'],function() {
    gulp.watch('./www/scripts/controllers/options.js', ['bundle-options']);
});

gulp.task('export-apk', function() {
    return gulp.src('platforms/android/build/outputs/apk/*').pipe(gulp.dest('apk'));
});

gulp.task('build', function() {
    runSequence('copy-dist', 'build-android' );
})

gulp.task('cordova-add-plugin', function() {
    process.chdir('dist');
    // update package.json
    return  cordova.plugin('add', args.plugin);
});

gulp.task('add-plugin', function() {
    runSequence('cordova-add-plugin','update-directory');
});


gulp.task('bundle-options', function() {
  return gulp.src('./www/scripts/controllers/options.js')
    .pipe(jspm({
      selfExecutingBundle: true
    }))
    .pipe(rename('options.js'))
    .pipe(gulp.dest('./www/scripts/'));
});