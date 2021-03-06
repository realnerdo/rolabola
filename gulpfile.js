var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify       = require('gulp-uglify'),
    concat       = require('gulp-concat'),
    connect      = require('gulp-connect'),
    notify       = require('gulp-notify');

gulp.task('styles', function() {
    return gulp.src('assets/sass/master.sass')
            .pipe(sass().on('error', sass.logError))
            .pipe(autoprefixer())
            .pipe(gulp.dest('public/css'))
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(connect.reload())
            .pipe(notify('Looking good!'))
});

gulp.task('scripts', function() {
    return gulp.src([
                'node_modules/jquery/dist/jquery.min.js',
                'assets/js/scripts.js'
            ])
            .pipe(concat('scripts.js'))
            .pipe(uglify())
            .pipe(gulp.dest('public/js'))
            .pipe(connect.reload())
            .pipe(notify('Magic!'))
});

gulp.task('connect', function() {
    connect.server({
        root: 'public',
        livereload: true
    });
});

gulp.task('watch', function() {
    gulp.watch('assets/sass/*.sass', ['styles']);
    gulp.watch('assets/js/*.js', ['scripts']);
});

gulp.task('default', ['connect', 'watch']);
