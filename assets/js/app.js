if ( !global._babelPolyfill ) {
    require( 'babel-polyfill' );
}

import Vue from 'vue';
import router from './router';
import App from './App.vue';
import store from './store';
import VueObserveVisibility from 'vue-observe-visibility';
import VueLazyload from 'vue-lazyload'
import VueScrollTo from 'vue-scrollto';

const moment = require( 'moment-timezone' );
require( 'moment/locale/nl' );

Vue.use( VueLazyload, {
    preLoad: 1.3,
    attempt: 1,
    loading: 'dist/images/loading.png',
} );

window._     = require( 'lodash' );
window.axios = require( 'axios' );

Vue.use( require( 'vue-moment' ), { moment } );
Vue.use( VueScrollTo );
Vue.use( VueObserveVisibility );

Vue.filter( 'formatDescription', function ( value ) {
    if ( !value ) return '';
    value = value.toString();
    return value.replace( /(?:\r\n|\r|\n)/g, '<br />' );
} );

new Vue( {
    el: '#app',
    store,
    router,
    render: h => h( App ),
} );
