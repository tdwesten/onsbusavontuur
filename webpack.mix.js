let mix = require('laravel-mix');
require('dotenv').config();
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your theme. By default, we are compiling the Sass file for the theme
 | as well as bundling up all the JS files.
 |
 */

mix.webpackConfig({
    module: {
        rules: [
            {
                test: /\.scss/,
                loader: 'import-glob-loader'
            }
        ]
    }
}).setResourceRoot('/dist/')
    .setPublicPath('dist')
    .js('assets/js/app.js', 'scripts')
    .extract([
        'jquery',
        'axios',
        'lodash',
        'tether',
        'vue',
        'vuex',
        'vuex-localstorage'
    ])
    .sass('assets/sass/style.scss', 'styles')
    .copyDirectory('assets/images', 'dist/images')
    .copyDirectory('assets/fonts', 'dist/fonts')
    .options({
        processCssUrls: false,
        uglify: {}
    })
    .browserSync({
        proxy: 'https://onsbusavontuur-static.test',
        has_ssl: true,
        injectChanges: true,
        logSnippet: true,
        port: 3000,
        files: ['dist/styles/*.css', 'dist/scripts/*.js']
    })
    .version();
