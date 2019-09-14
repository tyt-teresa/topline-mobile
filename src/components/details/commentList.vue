<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="comment in list"
        :key="comment.com_id.toString()"
      >
        <div slot="icon">
          <img class="avatar" :src="comment.aut_photo" alt="">
        </div>
        <div slot="title">
          <span>{{comment.aut_name}}</span>
        </div>
        <div slot="default">
          <van-button icon="like-o" size="mini" plain>赞</van-button>
        </div>
        <div slot="label">
          <p>{{comment.content}}</p>
          <p>
            <span>{{comment.pubdate|relativeTime}}</span>&nbsp;&nbsp;
            <span @click="handleShowReplyList(comment)">回复{{comment.reply_count}}</span>
          </p>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getCommentList } from '@/api/comment'
import eventHub from '@/utils/eventHub'
export default {
  name: 'CommentList',
  props: ['isArticle', 'id'],
  created () {
    eventHub.$on('sendSuccess', (obj) => {
      if (this.isArticle === obj.isArticle) {
        this.list.unshift(obj.comment)
      }
    })
  },
  data () {
    return {
      loading: false,
      finished: false,
      list: [],
      // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
      offset: null,
      limit: 10
    }
  },
  methods: {
    handleShowReplyList (comment) {
      this.$store.commit('setShowReplyList', true)
      this.$store.commit('setCurrentComment', comment)
    },
    async onLoad () {
      this.loading = true
      try {
        const data = await getCommentList({
          isArticle: this.isArticle,
          source: this.id,
          offset: this.offset,
          limit: this.limit
        })
        this.offset = data.last_id
        this.list.push(...data.results)
        this.loading = false
        if (data.results.length === 0) {
          this.finished = true
        }
      } catch (err) {
        this.$toast.fail('獲取評論失敗')
      }
    }
  }
}
</script>

<style scoped lang='less'>
.van-list {
  margin-bottom: 64px;
  .avatar {
  width: 25px;
  height: 25px;
  border-radius: 100%;
  margin-right: 5px;
}
}
</style>
