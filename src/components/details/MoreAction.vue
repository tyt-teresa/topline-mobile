<template>
  <div class="zan">
      <!-- 用户对文章的态度, -1: 无态度，0-不喜欢，1-点赞 -->
    <van-button
    :loading=loading
    round
    size="small"
    hairline
    type="primary"
    plain
    :icon="article.attitude===1?'good-job-o':'good-job'"
    @click=handelLiking
    >点赞</van-button>
    <van-button
    :loading=loading
    round
    size="small"
    hairline
    type="danger"
    plain
    :icon="article.attitude===0?'delete':''"
    @click="handeldislike"
    >不喜欢</van-button>
  </div>
</template>

<script>
import { likingArticle, unlikingArticle, dislikeArticles, undislikeArticle } from '@/api/articles'
export default {
  name: 'MoreAction',
  props: ['article'],
  data () {
    return {
      loading: false
    }
  },
  methods: {
    // 點讚和取消點讚
    async handelLiking () {
      if (!this.$checkLogin()) {
        return
      }
      this.loading = true
      try {
        if (this.article.attitude === 1) {
          // 當前是點讚狀態,需取消點讚
          await unlikingArticle(this.article.art_id)
          this.article.attitude = -1
          this.$toast.success('點讚成功')
        } else {
          await likingArticle(this.article.art_id)
          this.article.attitude = 1
          this.$toast.success('已取消點讚')
        }
      } catch (err) {
        this.$toast.fail('操作失败')
      }
      this.loading = false
    },
    // 不喜歡和取消不喜歡
    async handeldislike () {
      if (!this.$checkLogin()) {
        return
      }
      this.loading = true
      try {
        // 當前文章是不喜歡狀態,取消對文章不喜歡
        if (this.article.attitude === 0) {
          await undislikeArticle(this.article.art_id)
          this.article.attitude = -1
          this.$toast.success('取消不喜歡成功')
        } else {
          await dislikeArticles(this.article.art_id)
          this.article.attitude = 0
          this.$toast.success('已成功標記該文章')
        }
      } catch (err) {
        this.$toast.fail('操作失败')
      }
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
.zan{
    padding:20px;
   display: flex;
   justify-content: space-around;
}
</style>
