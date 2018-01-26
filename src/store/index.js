import Vue from 'vue';
import Vuex from 'vuex';
import posts from '@/store/modules/posts';
import tags from '@/store/modules/tags';

Vue.use(Vuex);

const pro = process.env.NODE_ENV === 'production';

const store = new Vuex.Store({
  state: {
    appName: 'CodeCook',
    isLogin: !!sessionStorage.isLogin,
    user: JSON.parse(sessionStorage.user || '{}'),
  },
  mutations: {
    setLogin(state, status) {
      state.isLogin = status;
    },
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
  },
  getters: {
  },
  modules: {
    posts,
    tags,
  },
});

export default store;
