// store.js

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        loggedIn: false,
        account: {},
    },
    mutations: {
        setLoggedIn(state, payload) {
            state.loggedIn = payload;
        },
        setAccount(state, payload) {
            state.account = payload;
        },
    },

    actions: {
        // You can define actions here to perform asynchronous operations and commit mutations.
        // Actions are optional but useful for more complex scenarios.
        SetLoggedIn(state, payload){
            state.commit('setLoggedIn', payload)
        },
        setAccount(state, payload){
            state.commit('setAccount', payload)
        }
    },
    getters: {
        // You can define getters here to compute derived state based on the store's state.
        // Getters are optional but useful for transforming or filtering state data.
        getLoggedIn(state){
            return state.loggedIn;
        },
        getAccount(state){
            return state.account;
        }
    }
});
