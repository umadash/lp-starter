'use strict';

import gulp from 'gulp';
import watch from 'gulp-watch';
import pug from 'gulp-pug';
import sass from 'gulp-sass';
import sassGlob from 'gulp-sass-glob';
import pleeease from 'gulp-pleeease';
import browserify from 'browserify';
import babelify from 'babelify';
import browserSync from 'browser-sync';
import readConfig from 'read-config';
import source from 'vinyl-source-stream';

// 定数
const SRC = './_src';
const CONFIG = './_src/config';
const PUBLIC = './public';
const BASE_PATH = '';
const DEST = `${PUBLIC}${BASE_PATH}`;

// html
gulp.task('pug', () => {
  const locals = readConfig(`${CONFIG}/meta.yml`);
  return gulp.src(`${SRC}/pug/**/[!_]*.pug`)
    .pipe(pug({
      locals: locals,
      pretty: true,
      basedir: `${SRC}/pug`
    }))
    .pipe(gulp.dest(`${DEST}`));
});
gulp.task('html', gulp.series('pug'));

// css
gulp.task('sass', () => {
  const config = readConfig(`${CONFIG}/pleeease.json`);
  return gulp.src(`${SRC}/scss/style.scss`)
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(pleeease(config))
    .pipe(gulp.dest(`${DEST}/css`))
});
gulp.task('css', gulp.series('sass'));

// js
gulp.task('browserify', () => {
  return browserify(`${SRC}/js/app.js`)
    .transform(babelify)
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest(`${DEST}/js`))
});
gulp.task('js', gulp.series('browserify'));

// browser-sync
gulp.task('browser-sync', () => {
  browserSync({
    server: {
      baseDir: PUBLIC
    },
    startPath: ``,
  });
  watch([
    `${SRC}/pug/**/*.pug`,
  ], gulp.series('pug', browserSync.reload));
  watch([`${SRC}/scss/**/*.scss`], gulp.series('sass', browserSync.reload));
  watch([`${SRC}/js/**/*.js`], gulp.series('js', browserSync.reload));
});
gulp.task('serve', gulp.series('browser-sync'));


// default
gulp.task('build', gulp.parallel('html', 'css', 'js'));
gulp.task('default', gulp.parallel('build', 'serve'));
