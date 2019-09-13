<template>
  <div>
    <van-search
      v-model="value"
      placeholder="请输入搜索关键词"
      show-action
      @search="onSearch(value)"
      @cancel="onCancel"
      @input="handelInput"
      background="#3296fa"
      clearable
    />
    <!-- 聯想建議 -->
    <van-cell-group v-show="value">
      <van-cell icon="search" v-for="item in suggestionList" :key="item" @click="onSearch(item)">
        <div slot="title" v-html="hightLight(item)"></div>
      </van-cell>
    </van-cell-group>
    <!-- 歷史記錄 -->
    <van-cell-group v-show="!value">
      <van-cell title="歷史記錄">
          <div v-show="isEdit" style="display:inline-block">
              <span>全部刪除</span>&nbsp;
              <span @click="isEdit=false">完成</span>&nbsp;
          </div>
           <van-icon
           @click="isEdit=true"
           v-show="!isEdit"
           name="delete" style="line-height:inherit" size="20px"/>
      </van-cell>
      <van-cell v-for="(item,index) in histories" :key="index" :title="item" @click="onSearch(item)">
          <van-icon name="close" v-show="isEdit" size="18px" @click="handelDelete(index)"/>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { getSuggestion, getSearchHistory } from '@/api/search'
import { mapState } from 'vuex'
import * as storageTools from '@/utils/localStorage'
import _ from 'lodash'
export default {
  name: 'Search',
  data () {
    return {
      value: '',
      suggestionList: [],
      histories: [],
      isEdit: false
    }
  },
  computed: {
    ...mapState(['user'])
  },
  async created () {
    // 登錄狀態下加載歷史記錄
    if (this.user) {
      const data = await getSearchHistory()
      this.histories.push(...data.keywords)
      return
    }
    // 沒登錄,從本地獲取數據
    this.histories = storageTools.getItem('history') || []
  },
  methods: {
    // 點擊X按鈕刪除索引對應的歷史記錄
    handelDelete (index) {
      this.histories.splice(index, 1)
      storageTools.setItem('history', this.histories)
    },
    //   搜索關鍵字高亮
    hightLight (item) {
      const reg = new RegExp(this.value, 'gi')
      return item.replace(reg, `<span style="color:red">${this.value}</span>`)
    },
    // 搜索歷史記錄
    onSearch (item) {
      // 點擊跳轉至搜索結果頁面
      this.$router.push({
        name: 'search-result',
        params: {
          q: item
        }
      })
      // 判斷histories中是否已存在item
      if (this.histories.includes(item)) {
        return
      }
      // 記錄搜索歷史
      this.histories.push(item)
    },
    onCancel () {},
    // 搜索聯想建議
    // 使用函數防抖方法解決input輸入框頻繁發送請求
    handelInput: _.debounce(async function () {
      if (this.value.length === 0) {
        return
      }
      try {
        const data = await getSuggestion(this.value)
        this.suggestionList = data.options
      } catch (err) {
        console.log(err)
      }
    }, 300)
  }
}
</script>

<style>
</style>
