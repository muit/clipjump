"use strict"

// -- DEPENDENCIES -------------------------------------------------------------
var gulp    = require('gulp');
var coffee  = require('gulp-coffee');
var concat  = require('gulp-concat');
var connect = require('gulp-connect');
var header  = require('gulp-header');
var uglify  = require('gulp-uglify');
var gutil   = require('gulp-util');
var pkg     = require('./package.json');

if(typeof Utyl == "undefined")
  require("./source/utyl/utyl.js");

// -- FILES --------------------------------------------------------------------
var assets  = './public/assets';
var source  = {
  game:   [
    'source/game/*.coffee', 
    'source/game/scripts/*.coffee'
  ],
  server: [
    'source/server/*.coffee',
    'source/server/scripts/*.coffee'
  ],
};
var banner  = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @link    <%= pkg.homepage %>',
  ' * @author  <%= pkg.author.name %> (<%= pkg.author.site %>)',
  ' * @license <%= pkg.license %>',
  ' */',
  ''].join('\n');

// -- TASKS --------------------------------------------------------------------
gulp.task('game', function()
{
  gulp.src(source.game)
    .pipe(concat(pkg.name +'.coffee'))
    .pipe(coffee().on('error', gutil.log))
    .pipe(uglify({mangle: false}))
    .pipe(header(banner, {pkg: pkg}))
    .pipe(gulp.dest(assets + '/js'))
    .pipe(connect.reload());
});

gulp.task('server', function()
{
  gulp.src(source.server)
    .pipe(concat('core.coffee'))
    .pipe(coffee().on('error', gutil.log))
    .pipe(uglify({mangle: false}))
    .pipe(header(banner, {pkg: pkg}))
    .pipe(gulp.dest('./bin'))
    .pipe(connect.reload());
});

gulp.task('init', function()
{
  //gulp.run(['game']);
  gulp.run(['server']);
});

gulp.task('default', function()
{
  gulp.run(['init']);

  Core = new require("./bin/core.js")();
  gulp.watch(source.game, ['game']);
});
