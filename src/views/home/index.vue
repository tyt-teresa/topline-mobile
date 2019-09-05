<template>
  <div>
    <van-nav-bar title="首页" fixed />
    <van-tabs animated>
      <van-tab v-for="channel in channelList" :title="channel.name" :key="channel.id">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <van-cell v-for="item in list" :key="item" :title="item" />
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getDafaultChannel } from '@/api/channel'
export default {
  name: 'Home',
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      channelList: []
    }
  },
  methods: {
    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 500)
    },
    async loadChannels () {
      try {
        const data = await getDafaultChannel()
        this.channelList = data.channels
      } catch (err) {
        console.log(err)
      }
    }
  },
  created () {
    this.loadChannels()
  }
}
</script>

<style lang="less" scoped>
.van-tabs {
  /deep/ .van-tabs__wrap {
    position: fixed;
    top: 46px;
    left: 0;
    z-index:2;
  }
  /deep/ .van-tabs__content {
    margin-top: 90px;
    margin-bottom: 50px;
  }
}
</style>
