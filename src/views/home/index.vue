<template>
  <div>
    <van-nav-bar title="黑馬頭條" fixed />
    <van-tabs animated v-model="activeIndex">
      <van-icon slot="nav-right" name="wap-nav" class="nav-btn" @click="showChannelEdit=true" />
      <van-tab v-for="channel in channels" :title="channel.name" :key="channel.id">
        <!-- 下拉刷新列表 -->
        <van-pull-refresh
          :success-text="successText"
          v-model="currentChannel.pullloading"
          @refresh="onRefresh"
        >
        <!-- 上拉加載歷史數據 -->
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
                  <van-grid-item v-for="(img,index) in article.cover.images" :key="img+index">
                    <van-image height="80" lazy-load :src="img">
                      <template v-slot:loading>
                        <van-loading type="spinner" size="20" />
                      </template>
                      <template v-slot:error>加载失败</template>
                    </van-image>
                  </van-grid-item>
                </van-grid>
                <div class="article-info">
                  <div class="meta">
                    <span>{{article.aut_name}}</span>
                    <span>{{article.comm_count}}</span>
                    <span>{{article.pubdate|relativeTime}}</span>
                  </div>
                  <!-- 點擊X按鈕記錄當前文章对象並控制MoreAction彈層 -->
                  <van-icon name="close" @click="handelMoreAction(article)"/>
                </div>
              </div>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
    <!-- 彈出組件moreAction -->
    <!-- 如果article的值為null,moreAction不顯示 -->
    <more-action
    @handelSuccess="handelSuccess"
    v-if="currentArticle"
    :article="currentArticle"
    v-model="showMoreAction"
    ></more-action>
    <channel-edit
    v-model="showChannelEdit"
    :channels="channels"
    :active="activeIndex"
    @activeChange="handelChange"
    ></channel-edit>
  </div>
</template>

<script>
import { getDafaultChannel } from '@/api/channel'
import { getArticles } from '@/api/articles'
// 優化頻道
import { getItem, setItem } from '@/utils/localStorage'
import Vue from 'vue'
import { Lazyload } from 'vant'
import MoreAction from '@/components/home/moreAction'
// 頻道管理
import ChannelEdit from '@/components/home/channelEdit'
Vue.use(Lazyload)
export default {
  name: 'Home',
  components: {
    MoreAction,
    ChannelEdit
  },
  data () {
    return {
      channels: [],
      activeIndex: 0,
      successText: '',
      showMoreAction: false,
      currentArticle: null,
      showChannelEdit: false
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
    handelChange (index) {
      this.activeIndex = index
      this.showChannelEdit = false
    },
    // MoreAction操作成功執行的方法
    handelSuccess () {
      // 隱藏彈層
      this.showMoreAction = false
      // 刪除當前的文章數據
      const articles = this.currentChannel.articles
      const index = articles.findIndex((article) => article.art_id === this.currentArticle.art_id)
      articles.splice(index, 1)
    },
    // 點擊X按鈕,顯示組件MoreAction,並記錄當前的文章
    handelMoreAction (article) {
      this.showMoreAction = true
      this.currentArticle = article
    },
    async loadChannels () {
      try {
        let channels = []
        if (this.$store.state.user) {
          const data = await getDafaultChannel()
          channels = data.channels
        } else {
          channels = getItem('channels')
          if (!channels) {
            const data = await getDafaultChannel()
            channels = data.channels
            setItem('channels', channels)
          }
        }
        channels.forEach(channel => {
          channel.timestamp = null
          channel.articles = []
          // 上拉加載歷史數據
          channel.loading = false
          channel.finished = false
          // 下拉加載新數據
          channel.pullloading = false
        })
        this.channels = channels
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
    .nav-btn {
      position: fixed;
      right: 10px;
      line-height: 44px;
      background-color: #fff;
      opacity: 0.8;
      font-size: 22px;
    }
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
</style>
