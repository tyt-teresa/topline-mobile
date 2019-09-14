export default {
  install (Vue) {
    Vue.prototype.$checkLogin = function () {
      // 判斷是否登錄
      // 如果沒有登錄,提示用戶是否跳轉登錄
      if (!this.$store.state.user) {
        this.$dialog.confirm({
          title: '登錄提示',
          message: '此功能需要登錄,是否跳轉到登錄頁面'
        }).then(() => {
          this.$router.push({
            path: '/login',
            query: {
              redirect: this.$router.fullpath
            }
          })
        }).catch(() => {
          // on cancel
        })
        return false
      }
      return true
    }
  }
}
