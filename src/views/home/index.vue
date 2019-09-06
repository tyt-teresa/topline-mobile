<template>
  <div>
    <van-nav-bar title="首页" fixed />
    <van-tabs animated v-model="activeIndex">
      <van-tab v-for="channel in channels" :title="channel.name" :key="channel.id">
        <van-list
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad">
          <van-cell
          v-for="article in currentChannel.articles"
          :key="article.art_id"
          :title="article.title"
         />
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getDafaultChannel } from '@/api/channel'
import { getArticles } from '@/api/articles'
export default {
  name: 'Home',
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      channels: [],
      activeIndex: 0
    }
  },
  created () {
    this.loadChannels()
  },
  computed: {
    // 返回当前的频道对象
    currentChannel () {
      return this.channels[this.activeIndex]
    }
  },
  methods: {
    async loadChannels () {
      try {
        const data = await getDafaultChannel()
        data.channels.forEach(channel => {
          channel.timestamp = null
          channel.articles = []
        })
        this.channels = data.channels
      } catch (err) {
        console.log(err)
      }
    },
    async onLoad () {
      const data = await getArticles({
        channelId: this.currentChannel.id,
        timestamp: this.currentChannel.timestamp || Date.now(),
        withTop: 1
      })
      console.log(data)
    }
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
