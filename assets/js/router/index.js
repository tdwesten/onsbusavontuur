import Vue from 'vue';
import Router from 'vue-router';

// Components
import Index from '../pages/Index';

Vue.use( Router );

const router = new Router( {
    // mode: 'history', // enable history mode
    routes: [
        {
            path: '/',
            name: 'index',
            component: Index
        },
        {
            path: '/spot/:spot',
            name: 'spot',
            component: Index
        },
    ],
} );

export default router;
