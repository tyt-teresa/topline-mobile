<template>
<!-- 舉報彈窗 -->
  <van-dialog
  :value="value"
  @input="$emit('input',$event)"
  :showConfirmButton="false"
  :showCancelButton="false"
  closeOnClickOverlay>
    <van-cell-group v-show="!showReports">
      <van-cell title="不感興趣" @click="handel(dislike)" />
      <van-cell title="反饋垃圾內容" is-link @click="showReports=true"/>
      <van-cell title="拉黑作者" @click="handel(blacklist)" />
    </van-cell-group>
    <van-cell-group v-show="showReports">
      <van-cell icon="arrow-left" title="反饋內容" @click="showReports=false"/>
      <van-cell
      v-for="item in reportList"
      :key="item.type"
      :title="item.title"
      @click="handel(report,item.type)" />
    </van-cell-group>
  </van-dialog>
</template>

<script>
import { dislikeArticles, reportsArticle } from '@/api/articles'
import { blackListUser } from '@/api/user'
export default {
  name: 'MoreAction',
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      showReports: false,
      // 举报类型： 0-其他问题，1-标题夸张，2-低俗色情，3-错别字多，4-旧闻重复，5-广告软文，6-内容不实，7-涉嫌违法犯罪，8-侵权'
      reportList: [
        { title: '标题夸张', type: 1 },
        { title: '低俗色情', type: 2 },
        { title: '错别字多', type: 3 },
        { title: '旧闻重复', type: 4 },
        { title: '广告软文', type: 5 },
        { title: '内容不实', type: 6 },
        { title: '涉嫌违法犯罪', type: 7 },
        { title: '侵权', type: 8 },
        { title: '其他问题', type: 0 }
      ]
    }
  },
  methods: {
    handel (type, reportType) {
      switch (type) {
        case 'dislike':
          this.dislike()
          break
        case 'blacklist':
          this.blacklist()
          break
        case 'report':
          this.reports(reportType)
          break
      }
    },
    async dislike () {
      try {
        await dislikeArticles(this.article.art_id)
        this.$toast.success('操作成功')
        this.$emit('handelSuccess')
      } catch (err) {
        this.$toast.fail('操作失敗')
      }
    },
    async blacklist () {
      try {
        await blackListUser(this.article.aut_id)
        this.$toast.success('操作成功')
        this.$emit('handelSuccess')
      } catch (err) {
        this.$toast.fail('操作失敗')
      }
    },
    async reports (reportType) {
      try {
        await reportsArticle({ target: this.article.art_id, type: reportType })
        this.$emit('input', false)
        this.$toast.success('操作成功')
      } catch (err) {
        this.$toast.fail('操作失敗')
      }
    }
  }
}
</script>

<style>
</style>
