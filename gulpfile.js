var browserify = require('browserify'),
    watchify = require('watchify'),
    reactify = require('reactify'),
    gulp = require('gulp'),
    source = require('vinyl-source-stream'),
    sourceFile = './js/app.js',
    destFolder = './js/',
    destFile = 'scripts.js';
 
gulp.task('browserify', function() {
  return browserify({
    entries: [sourceFile],
    transform: [reactify],
    debug: true,
    fullPaths: true
  })
  .bundle()
  .pipe(source(destFile))
  .pipe(gulp.dest(destFolder));
});
 
/*gulp.task('watch', function() {
  var bundler = watchify(sourceFile);
  bundler.on('update', rebundle);
 
  function rebundle() {
    return bundler.bundle()
      .pipe(source(destFile))
      .pipe(gulp.dest(destFolder));
  }
 
  return rebundle();
});*/

// WATCH
gulp.task('watch', function() {
  var bundler = browserify({
    entries: [sourceFile],
    transform: [reactify],
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: true
  });

  var watcher = watchify(bundler);

  return watcher.on('update', function() {
	  var stream = watcher.bundle();
	  stream.on('error', function(err) {
	    console.error(err);
	  });
	  stream.pipe(source(destFile))
	    .pipe(gulp.dest(destFolder))
	   // .pipe(plugins.connect.reload());
	  console.log('Updated');
  })
  .bundle()
  .pipe(source(destFile))
  .pipe(gulp.dest(destFolder));	
});
 
gulp.task('default', ['browserify', 'watch']);