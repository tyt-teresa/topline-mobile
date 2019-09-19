<template>
  <div>
    <van-nav-bar title="关注/粉丝" left-arrow @click-left="$router.back()" />
    <van-tabs v-model="active" color="#3296fa">
      <van-tab title="关注">
        <follow-list :type="active"></follow-list>
      </van-tab>
      <van-tab title="粉丝">
        <follow-list :type="active"></follow-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import FollowList from '@/components/follow/followList.vue'
export default {
  name: 'Follow',
  components: {
    FollowList
  },
  data () {
    return {
      active: 'fous',
      type: '1'
    }
  },
  created () {
    console.log('created')
  },
  activated () {
    this.type = this.$route.query.type
    if (this.type === '1') {
      this.active = 'fous'
    } else {
      this.active = 'fans'
    }
  }
}
</script>

<style>
</style>
