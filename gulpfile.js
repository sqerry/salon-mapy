var async = require('async'); //npm i async
var gulp = require('gulp');
var rename = require("gulp-rename"); //npm i gulp-rename
var sass = require('gulp-sass')(require('sass')); //npm install sass gulp-sass --save-dev
var sourcemaps = require('gulp-sourcemaps'); //npm i gulp-sourcemaps
var browserSync = require('browser-sync').create(); //npm i browser-sync
var concat = require('gulp-concat'); //npm i gulp-concat
var sftp = require('gulp-sftp-up4'); //npm i gulp-sftp-up4

//konfigurační soubor
var source = require('./gulp-source.json');
var remotePathOutput = '/'


//definice pro sass
gulp.task('sass', function(){
  return gulp.src('sablona/scss/*.scss')
  	.pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError)) // Converts Sass to CSS with gulp-sass
    .pipe(sourcemaps.write())
    .pipe(rename('style.css'))
    .pipe(gulp.dest('distr'))
    .pipe(sftp({
			host: source.hostname,
			user: source.username,
			pass: source.password,
			port: source.port,
			remotePath: remotePathOutput
	}))
	.pipe(browserSync.reload({
      stream: true
    }))
});

//bez sourcemap
gulp.task('sass-without-map', function(){
  return gulp.src('sablona/scss/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError)) // Converts Sass to CSS with gulp-sass
    .pipe(sourcemaps.write())
    .pipe(rename('style.css'))
    .pipe(gulp.dest('distr'))
    .pipe(sftp({
			host: source.hostname,
			user: source.username,
			pass: source.password,
			port: source.port,
			remotePath: remotePathOutput
	}))
	.pipe(browserSync.reload({
      stream: true
    }))
});

//definice pro js
gulp.task('js', function(){
  return gulp.src('sablona/js/*.js')
    .pipe(concat('script.js'))
    .pipe(gulp.dest('distr'))
    .pipe(sftp({
			host: source.hostname,
			user: source.username,
			pass: source.password,
			port: source.port,
			remotePath: remotePathOutput
	}))
	.pipe(browserSync.reload({
      stream: true
    }))
});

//browser synchronizace
gulp.task('browserSync', function() {
  browserSync.init({
	open: false,
	browser: ["google chrome", "firefox"],
	//reloadDelay: 2000,
	proxy: {
    	target: 'https://' + source.url + '.myshoptet.com',
	}	
	//baseDir: remotePathOutput,
  })
});

//finálovka
gulp.task('serve', gulp.parallel(['browserSync', 'sass', 'js'], function() {
	gulp.watch('sablona/scss/**/*.scss', gulp.series('sass'));
    gulp.watch('sablona/js/**/*.js', gulp.series('js'));
}));
gulp.task('default', gulp.series('serve'));

gulp.task('final', gulp.parallel(['sass-without-map', 'js'], function() {
	gulp.watch('sablona/scss/**/*.scss', gulp.series('sass-without-map'));
    gulp.watch('sablona/js/**/*.js', gulp.series('js'));
}));
gulp.task('default', gulp.series('final'));