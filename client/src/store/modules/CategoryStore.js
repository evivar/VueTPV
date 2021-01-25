import Vue from 'vue';

const state = {

    currentCategories: [],

    categoryErrorMsg: '',

    categoryErrorDialog: false

};

const getters = {
    currentCategories: (state) => { return state.currentCategories; }
};

const actions = {

    async getRootCategories({ commit }) {
        await Vue.axios.get('/category/readAllParentCategories').then((resp) => {
            let data = resp.data;
            if (data.data) {
                if ((data.data).some((category) => category.parentId)) {
                    commit('categoryError', 'Error processing parent categories')
                } else {
                    commit('setCategories', data.data);
                }
            } else {
                commit('categoryError', 'Error reading parent categories');
            }
        });
    },

    async loginUser({ commit, dispatch, state, rootState }, loginUser) {
        await Vue.axios.post('/user/loginUser', { email: loginUser.email }).then((resp) => {
            let data = resp.data;
            if (data && data.length > 0) {
                if (data[0].password == loginUser.password) {
                    loginUser.id = data[0]._id;
                    loginUser.username = data[0].user;
                    commit('loginUser', loginUser);
                } else {
                    commit('loginError');
                }
            }
        }).catch(() => {
            commit('loginError');
        });
    }

};

const mutations = {

    setCategories(state, categories) {

    },

    loginUser(state, loginUser) {
        state.loginUser = loginUser;
        state.isLoggedIn = true;
        state.usuario.id = loginUser.id;
        state.usuario.email = loginUser.email;
        state.usuario.username = loginUser.username;
    }

};

export default {
    state,
    getters,
    actions,
    mutations
};