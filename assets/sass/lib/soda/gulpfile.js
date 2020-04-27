var gulp = require( 'gulp' ),
    sass = require( 'gulp-sass' ),
    notify = require( "gulp-notify" ),
    plumber = require( 'gulp-plumber' ),
    minifyCSS = require( 'gulp-clean-css' ),
    rename = require( 'gulp-rename' ),
    browserSync = require( 'browser-sync' ).create(),
    autoprefixer = require( 'gulp-autoprefixer' );

var paths = {
    browsersync: {
        server: true,
        index: 'index.html'
    },
    scss: {
        src: 'scss/**/*.scss',
        dest: 'dist/stylesheets',
    }
};

gulp.task( 'default', [ 'styles' ] );

gulp.task( "watch", [ 'default' ], function () {
    gulp.watch( paths.scss.src, [ 'styles' ] );

    browserSync.init( {
        server: {
            index: 'index.html'
        }
    } );
} );

gulp.task( "styles", function () {
    return gulp.src( paths.scss.src )
        .pipe( sass().on( 'error', sass.logError ) )
        .pipe( autoprefixer( {
            browsers: [ 'last 3 versions' ],
            cascade: false
        } ) )
        .pipe( minifyCSS( {
            restructuring: false
        } ) )
        .pipe( gulp.dest( paths.scss.dest ) )
        .pipe( browserSync.stream() )
        .pipe( notify( "CSS done!" ) );
} );