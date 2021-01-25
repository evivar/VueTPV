import Vue from 'vue';

const state = {

    usuario: {
        id: 'a',
        email: 'b',
        username: 'c'
    }
};

const getters = {
    loginUser: (state) => { return state.loginUser; }
};

const actions = {
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