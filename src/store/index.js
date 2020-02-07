import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var state = {
  tipInfo: {
    status: 'closed',
    message: ''
  }
}

var getters = {
  tipStatus: function (state) {
    return state.tipInfo.status
  },

  tipMessage: function (state) {
    return state.tipInfo.message
  }
}

var mutations = {

  // 关闭提示信息
  CLOSE_TIP: function (state, {message}) {
    state.tipInfo.status = 'closed'
    state.tipInfo.message = message
  },

  // 显示提示信息
  OPEN_TIP: function (state, {message}) {
    state.tipInfo.status = 'opened'
    state.tipInfo.message = message
  }
}

var actions = {

  // 关闭提示
  CLOSE_TIP: function (context) {
    context.commit('CLOSE_TIP', {
      message: ''
    })
  },

  // 开启提示
  OPEN_TIP: function (context, {message}) {
    context.commit('OPEN_TIP', {
      message
    })
  }
}

export default new Vuex.Store({
  state,
  modules: {
  },
  getters,
  mutations,
  actions
})
