import {createStore} from 'vuex';

import rootMutations from './mutations'
import rootActions from './actions'
import rootGetters from './actions'

const store = createStore({
    state() {
        return {
            waitingTasksList: JSON.parse(localStorage.getItem('waitingTasksList')) ?? []
        };
    },
    mutations: rootMutations,
    actions: rootActions,
    getters: rootGetters
});

export default store;