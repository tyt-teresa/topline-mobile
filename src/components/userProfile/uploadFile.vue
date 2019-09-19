<template>
  <van-dialog
    :value="value"
    @input="$emit('input',$event)"
    :showConfirmButton="false"
    closeOnClickOverlay
  >
    <van-cell-group>
      <van-cell title="从相册选择图片" @click="handleSelectFile"/>
      <input type="file" style="display:none" ref="file">
      <van-cell title="拍照" />
      <van-cell title="取消" @input="$emit('input',false)" />
    </van-cell-group>
  </van-dialog>
</template>

<script>
import Vue from 'vue'
import { ImagePreview } from 'vant'
import { uploadPhoto } from '@/api/user'
Vue.use(ImagePreview)
export default {
  name: 'UploadFile',
  props: ['value'],
  methods: {
    handleSelectFile () {
      this.$refs.file.click()
      this.$refs.file.onchange = (e) => {
        if (e.target.files.length === 0) {
          return
        }
        const url = URL.createObjectURL(e.target.files[0])
        this.$emit('input', false)
        ImagePreview({
          images: [
            url
          ],
          showIndex: false,
          onClose: this.handleUploadPhoto()
        })
      }
    },
    handleUploadPhoto () {
      this.$dialog.confirm({
        message: '是否确认该图片作为头像'
      }).then(async () => {
        this.$toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true, // 禁用背景点击
          loadingType: 'spinner',
          message: '正在上传...'
        })
        // on confirm
        try {
          const data = await uploadPhoto('photo', this.$refs.file.files[0])
          this.$emit('upload-success', data.photo)
          this.$toast.fail('头像上传成功')
        } catch (err) {
          this.$toast.fail('头像上传失败')
        }
        this.$toast.clear()
      }).catch(() => {

      })
    }
  }
}
</script>

<style lang="less" scoped>
.van-cell__title{
    text-align: center;
}
</style>
