import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const types = {
  SET_AUTHENTICATED: "SET_AUTHENTICATED",
  SET_USER: "SET_USER"
};

export default new Vuex.Store({
  state: {
    //是否授权
    isAuthentivated: false,
    //用户信息
    user: {}
  },
  getters: {
    isAuthentivated: state => state.isAuthentivated,
    user: state => state.user
  },
  mutations: {
    [types.SET_AUTHENTICATED](state, isAuthentivated) {
      if (isAuthentivated) state.isAuthentivated = isAuthentivated;
      else state.isAuthentivated = false;
    },
    [types.SET_USER](state, user) {
      if (user) state.user = user;
      else state.user = {};
    }
  },
  actions: {
    setAuthentivated: ({ commit }, isAuthentivated) => {
      commit(types.SET_AUTHENTICATED, isAuthentivated);
    },
    setUser: ({ commit }, user) => {
      commit(types.SET_USER, user);
    },
    clearCurrentState: ({ commit }) => {
      commit(types.SET_AUTHENTICATED, false);
      commit(types.SET_USER, null);
    }
  }
});
