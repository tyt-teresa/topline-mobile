<template>
  <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
    <van-cell v-for="item in list" :key="item.id.toString()" :title="item.name" />
  </van-list>
</template>

<script>
import { getfollowings, getfollowers } from '@/api/user'
export default {
  name: 'FollowList',
  props: ['type'],
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 10
    }
  },
  methods: {
    async onLoad () {
      try {
        let data = null
        if (this.type === 0) {
          // 获取用户关注列表
          data = await getfollowings({
            page: this.page,
            perPage: this.per_page
          })
        } else {
          data = await getfollowers({
            page: this.page,
            perPage: this.per_page
          })
        }
        this.page++
        this.list.push(...data.results)
        this.loading = false
        if (data.results.length === 0) {
          this.finished = false
        }
      } catch (err) {
        this.$toast.fail('数据加载失败')
      }
    }
  }
}
</script>

<style>
</style>
