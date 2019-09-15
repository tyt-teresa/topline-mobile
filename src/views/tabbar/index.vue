<template>
  <div>
    <router-view></router-view>
    <van-tabbar route>
      <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/question" icon="question-o">问答</van-tabbar-item>
      <van-tabbar-item to="/vedio" icon="video-o">视频</van-tabbar-item>
      <van-tabbar-item to="/user" icon="user-o">{{user ? '我的' : '未登錄'}}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Tabbar',
  data () {
    return {
      active: 'home'
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style>
</style>
