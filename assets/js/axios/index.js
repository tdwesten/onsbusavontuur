import axios from 'axios';
import store from './../store';

const REST_URL = window.location.origin + process.env.MIX_VUE_APP_REST;

export const REST = axios.create({
    baseURL: REST_URL,
    transformResponse: [
        data => {
            let newData = JSON.parse(data);
            store.dispatch('handleAuthStatus', newData);
            return newData;
        }
    ]
});
