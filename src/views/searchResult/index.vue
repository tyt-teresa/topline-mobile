<template>
  <div>
    <van-nav-bar title="搜索結果" left-text="返回" left-arrow fixed @click-left="$router.back()" />
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="article in list" :key="article.art_id.toString()" :title="article.title">
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
          <div>
            <span>{{article.aut_name}}</span>&nbsp;
            <span>{{article.comm_count}}</span>&nbsp;
            <span>{{article.pubdate|relativeTime}}</span>
          </div>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
export default {
  name: 'SearchResult',
  props: ['q'],
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
        const data = await getSearchResult({
          page: this.page,
          perPage: this.per_page,
          q: this.q
        })
        this.list.push(...data.results)
        this.page++
        this.loading = false
        if (data.results.length === 0) {
          this.finished = true
        }
      } catch (err) {
        this.$toast.fail('獲取搜索結果失敗')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.van-list {
  margin-top: 46px;
}
</style>
