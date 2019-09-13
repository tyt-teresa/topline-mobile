<template>
  <div class="author-info">
    <div class="base-info">
      <img class="avatar" :src="article.aut_photo" />
      <div>
        <p>{{article.aut_name}}</p>
        <p>{{article.pubdate|relativeTime}}</p>
      </div>
    </div>
    <van-button round size="small" type="info" :loading="loading" @click="handelfollow">{{article.is_followed?'已':'+'}}关注</van-button>
  </div>
</template>

<script>
import { followUser, unfollowUser } from '@/api/user'
export default {
  name: 'author-info',
  props: ['article'],
  data () {
    return {
      loading: false
    }
  },
  methods: {
    async handelfollow () {
      // 判斷是否登錄
      if (!this.$checkLogin) {
        return
      }
      this.loading = true
      try {
        // 判斷是否已關注
        // 如果已關注,取消關注並將是否已關注改為false
        if (this.article.is_followed) {
          await unfollowUser(this.article.aut_id)
          this.article.is_followed = false
          this.$toast.success('取消關注成功')
        } else {
          // 如果已關注,取消關注並將是否已關注改為false
          await followUser(this.article.aut_id)
          this.$toast.success('關注成功')
          this.article.is_followed = true
        }
      } catch (err) {
        this.$toast.fail('操作失敗')
      }
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
.author-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  .base-info {
    display: flex;
    align-items: center;
    .avatar {
      margin-right: 10px;
      width: 50px;
      height: 50px;
      border-radius: 100%;
    }
  }
}
</style>
