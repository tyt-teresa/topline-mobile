<template>
  <channel-edit>
    <van-nav-bar title="黑馬頭條" fixed />
    <van-tabs animated v-model="activeIndex">
      <van-icon name="wap-nav" slot="nav-right" calss="nav-btn" />
      <van-tab v-for="channel in channels" :title="channel.name" :key="channel.id">
        <van-pull-refresh
          :success-text="successText"
          v-model="currentChannel.pullloading"
          @refresh="onRefresh"
        >
          <van-list
            v-model="currentChannel.loading"
            :finished="currentChannel.finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-cell
              v-for="article in currentChannel.articles"
              :key="article.art_id.toString()"
              :title="article.title"
            >
              <div slot="label">
                <van-grid :border="false" :column-num="3">
                  <van-grid-item v-for="(img,index) in article.cover.images" :key="index">
                    <van-image height="80" :src="img" />
                  </van-grid-item>
                </van-grid>
                <div class="article-info">
                  <div class="meta">
                    <span>{{article.aut_name}}</span>
                    <span>{{article.comm_count}}</span>
                    <span>{{article.pubdate|relativeTime}}</span>
                  </div>
                  <van-icon name="close" />
                </div>
              </div>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </channel-edit>
</template>

<script>
import { getDafaultChannel } from '@/api/channel'
import { getArticles } from '@/api/articles'
// import ChannelEdit from '@/components/channelEdit'
export default {
  name: 'Home',
  components: {
    // ChannelEdit
  },
  data () {
    return {
      channels: [],
      activeIndex: 0,
      successText: ''
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
          // 上拉加載歷史數據
          channel.loading = false
          channel.finished = false
          // 下拉加載新數據
          channel.pullloading = false
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
      this.currentChannel.timestamp = data.pre_timestamp
      this.currentChannel.articles.push(...data.results)
      this.currentChannel.loading = false
      this.currentChannel.finished = true
    },
    async onRefresh () {
      try {
        const data = await getArticles({
          channelId: this.currentChannel.id,
          timestamp: this.currentChannel.timestamp || Date.now(),
          withTop: 1
        })
        this.currentChannel.articles.unshift(...data.results)
        this.successText = `加載了${data.results.length}條數據`
        this.currentChannel.pullloading = false
      } catch (err) {
        console.log(err)
      }
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
    right: 10px;
    z-index: 2;
  }
  /deep/ .van-tabs__content {
    margin-top: 90px;
    margin-bottom: 50px;
    .article-info {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .meta span {
        margin-right: 10px;
      }
    }
  }
}

.nav-btn {
  position: fixed;
  right: 5px;
  line-height: 44px;
}
</style>
