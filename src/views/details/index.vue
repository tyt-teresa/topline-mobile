<template>
  <div>
    <van-nav-bar fixed left-text="返回" @click-left="$router.back()" title="文章详情"></van-nav-bar>
    <div class="article" v-if="article">
      <!-- 文章標題 -->
      <h3 class="article-title">{{article.title}}</h3>
      <!-- 作者信息 -->
      <author-info :article="article"></author-info>
      <!-- 文章內容 -->
      <div class="article-content" v-html="article.content"></div>
      <!-- 點讚和取消 -->
      <more-action :article="article"></more-action>
      <!-- 評論列表 -->
      <comment-list :isArticle="true" :id="article.art_id.toString()" ></comment-list>
      <!-- 發表評論 -->
      <publish-comment :isArticle="true" :target="article.art_id.toString()"></publish-comment>
      <!-- 回復彈層 -->
      <reply-list v-model="showReplyList" :art_id="id"></reply-list>
    </div>
  </div>
</template>

<script>
import { getDetailArticle } from '@/api/articles'
import AuthorInfo from '@/components/details/authorInfo'
import MoreAction from '@/components/details/MoreAction'
import CommentList from '@/components/details/commentList'
import PublishComment from '@/components/details/publishComment'
import ReplyList from '@/components/details/replyList'
import { mapState } from 'vuex'
export default {
  name: 'detail',
  props: ['id'],
  components: {
    AuthorInfo,
    MoreAction,
    CommentList,
    PublishComment,
    ReplyList
  },
  computed: {
    ...mapState(['showReplyList'])
  },
  data () {
    return {
      article: null
    }
  },
  created () {
    this.loadDetailArticle()
  },
  methods: {
    async loadDetailArticle () {
      try {
        const data = await getDetailArticle(this.id)
        this.article = data
      } catch (err) {
        this.$toast.fail('獲取文章詳情失敗')
      }
    }
  }
}
</script>

<style scoped lang='less'>
.article {
  margin-top: 48px;
  padding: 0px 20px;
  .article-content {
    font-size: 14px;
  }
}
</style>
