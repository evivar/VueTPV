import Vue from 'vue';

const state = {

    currentCateogry: {
        status: null,
        active: null,
        _id: null,
        parentId: null,
        name: 'Root',
        __v: null
    },

    childrenCategories: [],

    products: [],

    categoryErrorMsg: '',

    productErrorMsg: '',

    categoryErrorDialog: false,
    
    productErrorDialog: false

};

const getters = {
    currentCateogry: (state) => { return state.currentCateogry; },
    childrenCategories: (state) => { return state.childrenCategories; },
    products: (state) => { return state.products; }
};

const actions = {

    getRootCategories({ commit }) {
        Vue.axios.get('/category/readAllParentCategories').then((resp) => {
            let data = resp.data;
            if (data.data) {
                if ((data.data).some((category) => category.parentId)) {
                    commit('categoryError', 'Error processing parent categories')
                } else {
                    commit('setRootCategories', data.data);
                }
            } else {
                commit('categoryError', 'Error reading parent categories');
            }
        });
    },

    getChildrenCategoriesByParentId({commit}, category){
        Vue.axios.post('/category/readAllChildrenCategoriesByParentId', {parentId: category._id}).then((resp) => {
            let data = resp.data;
            if(data.data){
                data.category = category
                commit('setCategories', data);
            }
            else{
                commit('categoryError', 'Error reading children categories');
            }
        });
    },

    getParentCategoriesByChildId({commit}, category){
        Vue.axios.post('/category/readAllChildrenCategoriesByParentId', {parentId: category.parentId}).then((resp) => {
            let data = resp.data;
            if(data.data){
                data.category = category
                commit('setCategories', data);
            }
            else{
                commit('categoryError', 'Error reading children categories');
            }
        });
    },

    getProductsByCategoryId({commit}, categoryId){
        Vue.axios.post('/product/readProductsByCategoryId', {categoryId: categoryId}).then((resp) => {
            let data = resp.data;
            if(data.data){
                commit('setProducts', data.data);
            }
            else{
                commit('productError', 'Error reading products from category');
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

    setRootCategories(state, categories) {
        state.childrenCategories = categories;
        state.currentCateogry.name = 'Root';
        state.currentCateogry._id = null;
    },

    setCategories(state, data){
        state.childrenCategories = data.data;
        state.currentCateogry = data.category;
    },

    setProducts(state, products){
        state.products = products;
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