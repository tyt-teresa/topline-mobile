import Vue from 'vue'
import Vuex from 'vuex'
// 引入本地存储封装文件
import * as storageTools from '@/utils/localStorage'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 项目运行时,先到本地存储获取登录状态
    user: storageTools.getItem('user'),
    showReplyList: false,
    currentComment: null
  },
  mutations: {
    setUser (state, user) {
      // 将登录页请求成功的user信息保存到状态中
      state.user = user
      // 并存储到本地
      storageTools.setItem('user', user)
    },
    setShowReplyList (state, isShow) {
      state.showReplyList = isShow
    },
    setCurrentComment (state, comment) {
      state.currentComment = comment
    }
  },
  actions: {

  }
})
