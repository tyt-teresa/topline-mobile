<template>
 <div class="add-comment">
   <div class="input-wrap">
     <input type="text" v-model="content">
   </div>
   <div class="more-wrap">
     <van-icon name="star-o" v-if="!isArticle"></van-icon>
     <van-button size="small" type="info" @click="handelSend">發佈</van-button>
   </div>
 </div>
</template>

<script>
import { sendComment } from '@/api/comment'
import eventHub from '@/utils/eventHub'
export default {
  name: 'PublishComment',
  props: ['isArticle', 'target', 'art_id'],
  data () {
    return {
      content: ''
    }
  },
  methods: {
    async handelSend () {
      if (!this.$checkLogin()) {
        return
      }
      if (this.content.length === 0) {
        this.$toast('請輸入評論內容')
        return
      }
      try {
        const data = await sendComment({
          target: this.target,
          content: this.content,
          artId: this.art_id
        })
        eventHub.$emit('sendSuccess', {
          comment: data.new_obj,
          isArticle: this.isArticle
        })
        this.content = ''
      } catch (err) {
        this.$toast.fail('發送失敗')
      }
    }
  }
}
</script>

<style scoped lang="less">
.add-comment {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  // background: #3296fa;
  padding: 10px;
  border-top: 2px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .input-wrap {
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 8px;
    height: 30px;
    display: flex;
    align-items: center;
    width: 65%;
    input {
      border: none;
      color: #999;
      font-size: 15px;
    }
  }
  .more-wrap {
    display: flex;
    width: 35%;
    align-items: center;
    justify-content: space-evenly;
  }
}
</style>
