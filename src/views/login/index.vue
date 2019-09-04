<template>
  <div>
    <van-nav-bar title="登录" />
    <van-cell-group>
      <van-field
      v-validate="{required:true,regex:/^1[3456789]\d{9}$/}"
      name="mobile"
      clearable
      v-model="user.mobile"
      left-icon="phone-o"
      placeholder="请输入手机号"
      :error-message="errors.first('mobile')"
      />
    </van-cell-group>
    <van-cell-group>
      <van-field
      v-validate="{required:true,regex:/^\d{6}$/}"
      v-model="user.code"
      clearable
      center
      name="code"
      left-icon="more-o"
      placeholder="请输入验证码"
      :error-message="errors.first('code')"
      >
        <van-button slot="button" size="small" type="default" round>获取验证码</van-button>
      </van-field>
    </van-cell-group>
    <div class="login-btn">
      <van-button
      type="default"
      @click="onLogin"
      :loading="isLoading"
      loading-type="spinner"
      loading-text="正在努力加载中..."
      >登录</van-button>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
import { mapMutations } from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      isLoading: false
    }
  },
  methods: {
    ...mapMutations(['setUser']),
    async onLogin () {
      try {
        const isValid = await this.$validator.validate()
        if (!isValid) {
          return
        }
        this.isLoading = true
        const data = await login(this.user)
        // 存储登录的状态[vuex(其他外面可以继续读取到),本地(刷新后数据依然保留)]
        // this.$store.commit('setUser', data)
        this.setUser(data)
        // 跳转到首页并提示成功
        this.$router.push('/')
        this.$toast.fail('登录成功')
        this.isLoading = false
      } catch (err) {
        if (err.response && err.response.status === 400) {
          this.$toast.fail('手机号码或验证码错误')
          this.isLoading = false
        }
      }
    }
  },
  created () {
    this.$validator.localize('zh_CN', {
      custom: {
        mobile: {
          required: '手机号不能为空',
          regex: '手机号必须是11位数字'
        },
        code: {
          required: '验证码不能为空',
          regex: '验证码必须是6位数字'
        }
      }
    })
  }
}
</script>

<style lang="less" scoped>
.van-cell-group{
  .van-button{
    background-color: #ededed;
  }
}
.login-btn {
  padding: 20px;
  .van-button {
    width: 100%;
    background-color: #6db4fb;
    border-radius: 5px;
    color: #fff;
  }
}
</style>
