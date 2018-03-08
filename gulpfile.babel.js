'use strict';

const gulp = require("gulp");
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const pleeease = require('gulp-pleeease');
const browserSync = require('browser-sync');
const runSequence = require("run-sequence");
const readConfig = require('read-config');
const webpackStream = require("webpack-stream");
const webpack = require("webpack");
const webpackConfig = require("./webpack.config");

// 定数
const SRC = './_src';
const CONFIG = './_src/config';
const PUBLIC = './public';
const BASE_PATH = '';
const DEST = `${PUBLIC}${BASE_PATH}`;

// js
gulp.task('js', () => {
  return webpackStream(webpackConfig, webpack).pipe(gulp.dest('public/js'));
});

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
gulp.task('html', ['pug']);

// css
gulp.task('sass', () => {
  const config = readConfig(`${CONFIG}/pleeease.json`);
  return gulp.src(`${SRC}/scss/style.scss`)
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(pleeease(config))
    .pipe(gulp.dest(`${DEST}/css`))
});
gulp.task('css', ['sass']);

// browser-sync
gulp.task('browser-sync', () => {
  browserSync({
    server: {
      baseDir: PUBLIC
    },
    startPath: ``,
  });
  gulp.watch([`${SRC}/pug/**/*.pug`], ['pug', browserSync.reload]);
  gulp.watch([`${SRC}/scss/**/*.scss`], ['sass', browserSync.reload]);
  gulp.watch([`${SRC}/js/**/*.js`], ['js', browserSync.reload]);
});
gulp.task('serve', ['browser-sync']);


// default
gulp.task('build', runSequence('html', 'css', 'js'));
gulp.task('default', runSequence('build', 'serve'));
