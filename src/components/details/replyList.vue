<template>
  <van-popup
    v-if="currentComment"
    :value="value"
    @input="$store.commit('setShowReplyList',$event)"
    position="bottom"
    :style="{ height: '80%' }"
  >
    <van-nav-bar icon="cross" :title="currentComment.reply_count+'条評論'" size="large" />
    <van-cell>
      <div slot="icon">
        <img :src="currentComment.aut_photo" alt  class="avatar"/>
      </div>
      <div slot="title">
        <span>{{currentComment.aut_name}}</span>&nbsp;
        <van-tag type="primary">樓主</van-tag>
      </div>
      <div slot="default">
        <van-button icon="like-o" size="mini" plain>赞</van-button>
      </div>
      <div slot="label">
        <p>{{ currentComment.content }}</p>
        <p>
          <span>{{currentComment.pubdate|relativeTime}}</span>&nbsp;
          <span>回復{{currentComment.reply_count}}</span>
        </p>
      </div>
    </van-cell>
    <h5 class="replyTitle">回復列表</h5>
    <comment-list :isArticle="false" :id="currentComment.com_id.toString()"></comment-list>
    <publish-comment :isArticle="false" :target="currentComment.com_id.toString()"></publish-comment>
  </van-popup>
</template>

<script>
import { mapState } from 'vuex'
import CommentList from './commentList'
import PublishComment from './publishComment'
import eventHub from '@/utils/eventHub'
export default {
  name: 'ReplyList',
  props: ['value', 'art_id'],
  components: {
    CommentList,
    PublishComment
  },
  computed: {
    ...mapState(['currentComment'])
  },
  created () {
    eventHub.$on('sendSuccess', () => {
      this.currentComment.reply_count++
    })
  }
}
</script>

<style scoped lang='less'>
 .avatar {
  width: 25px;
  height: 25px;
  border-radius: 100%;
  margin-right: 5px;
}
.replyTitle{
    padding-left:10px
}
</style>
