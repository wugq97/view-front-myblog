const style = {
  state: {
    style: 'classA'
  },

  mutations: {
    SET_STYLE: (state, style) => {
      state.style = style
    }
  },

  actions: {
    // 登录
    Set ({ commit }, style) {
      commit('SET_STYLE', style)
    }
  }
}

export default style
