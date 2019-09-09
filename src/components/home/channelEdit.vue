<template>
  <van-popup
    :value="value"
    @input="$emit('input',$event)"
    position="bottom"
    :style="{ height: '92%' }"
  >
    <van-cell icon="cross" @click="$emit('input', false)" />
    <!-- 我的频道 -->
    <van-cell title="我的频道" label="点击进入频道">
      <van-button round type="danger" size="mini" v-show="!isEdit" @click="isEdit=true">编辑</van-button>

      <van-button round type="danger" size="mini" v-show="isEdit" @click="isEdit=false">完成</van-button>
    </van-cell>
    <van-grid>
      <van-grid-item
        v-for="(channel,index) in channels"
        :key="channel.id"
        :text="channel.name"
        @click="handleMyChannelItem(index, channel.id)"
      >
        <div
          slot="text"
          class="van-grid-item__text"
          :class="{ active: active === index }"
        >{{ channel.name }}</div>
        <!-- 关闭按钮 -->
        <van-icon slot="icon" class="close-icon" name="close" v-show="isEdit && index !== 0" />
      </van-grid-item>
    </van-grid>
    <!-- 推荐频道 -->
    <van-cell title="推荐频道" label="点击添加频道" />
    <van-grid>
      <van-grid-item
        @click="handleChannelItem(channel)"
        v-for="channel in recommendChannels"
        :key="channel.id"
        :text="channel.name"
      />
    </van-grid>
  </van-popup>
</template>

<script>
import { getAllChannels, deleteChannel, addChannel } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/localStorage'
export default {
  name: 'ChannelEdit',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    channels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      isEdit: false,
      allchannels: []
    }
  },
  computed: {
    ...mapState(['user']),
    recommendChannels () {
      const ids = this.channels.map((channel) => {
        return channel.id
      })
      return this.allchannels.filter((channel) => {
        return !ids.includes(channel.id)
      })
    }
  },
  methods: {
    async loadAllChannel () {
      try {
        const data = await getAllChannels()
        this.allchannels = data.channels
      } catch (err) {
        console.log(err)
      }
    },
    // 點擊我的頻道
    async handleMyChannelItem (index, channelId) {
      // 1.非編輯模式(點擊具體頻道跳轉到首頁頻道下的對應頻道)
      if (!this.isEdit) {
        this.$emit('activeChange', index)
        return
      }
      // 2.編輯模式
      this.channels.splice(index, 1)
      if (this.user) {
        try {
          await deleteChannel(channelId)
        } catch (err) {
          this.$toast.fail('操作失敗')
        }
        return
      }
      setItem('channels', this.channels)
    },
    // 點擊推薦頻道
    async handleChannelItem (channel) {
      this.$set(channel, 'timestamp', null)
      this.$set(channel, 'articles', [])
      this.$set(channel, 'loading', false)
      this.$set(channel, 'finished', false)
      this.$set(channel, 'pullloading', false)
      // channel.timestamp = null
      // channel.articles = []
      // channel.loading = false
      // channel.finished = false
      this.channels.push(channel)
      if (this.user) {
        try {
          await addChannel(channel.id, this.channels.length)
        } catch (err) {
          this.$toast.fail('操作失敗')
        }
        return
      }
      setItem('channels', this.channels)
    }
  },
  created () {
    this.loadAllChannel()
  }
}
</script>

<style lang="less" scoped>
.close-icon{
    position: absolute;
    right:5px;
    top:5px;
}
.active{
  color:red;
}
</style>
