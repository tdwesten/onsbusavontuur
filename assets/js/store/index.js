import Vue from 'vue';
import Vuex from 'vuex';
import createPersist from 'vuex-localstorage';
import * as actions from './actions';
import * as getters from './getters';

// modules
import spots from './modules/spots';

Vue.use( Vuex );

const debug = process.env.NODE_ENV !== 'production';

let localStorage = createPersist( {
    namespace: 'ONSBUSAVONTUUR',
    initialState: {},
    expires: 1.21e9, // Two Weeks
    namespaced: true
} );

export default new Vuex.Store( {
    actions,
    getters,
    modules: {
        spots,
    },
    mutations: {},
    strict: debug,
    plugins: []
} );
