import Vue from 'vue';
import Vuex from 'vuex';

import product from './modules/ProductStore';
import category from './modules/CategoryStore';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        product,
        category
    }
});