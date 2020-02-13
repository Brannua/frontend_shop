import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {}
  },
  mutations: {
    // 成功登录后保存住用户名
    loginMutation(state, status) {
      state.userInfo = status;
    }
  },
  actions: {
    // 该方法单纯是为了练习通过 actions 调用 mutations 的方法来改变 state 中的数据
    loginAction({ commit }, user) {
      commit('loginMutation', user);
    }
  }
});
