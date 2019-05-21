const chat = {
  state: {
    content: []
  },

  mutations: {
    SET_CONTENT: (state, content) => {
      state.content = content
    }
  },

  actions: {
    // 登录
    SetChat ({ commit }, content) {
      commit('SET_CONTENT', content)
    }
  }
}

export default chat
