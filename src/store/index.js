import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import style from './modules/style'
import chat from './modules/chat'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    style,
    chat
  },
  getters
})

export default store
