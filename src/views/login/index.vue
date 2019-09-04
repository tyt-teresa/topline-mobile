<template>
  <div>
    <van-nav-bar title="登录" />
    <van-cell-group>
      <van-field
      v-validate="required"
      name="mobile"
      v-model="user.mobile"
      left-icon="phone-o"
      placeholder="请输入手机号"
      error-message=""
      />
    </van-cell-group>
    <van-cell-group>
      <van-field
      v-validate="required"
      v-model="user.code"
      center
      name="code"
      left-icon="more-o"
      placeholder="请输入验证码"
      >
        <van-button slot="button" size="small" type="default" round>获取验证码</van-button>
      </van-field>
    </van-cell-group>
    <div class="login-btn">
      <van-button type="default" @click="onLogin">登录</van-button>
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
      }
    }
  },
  methods: {
    ...mapMutations(['setUser']),
    async onLogin () {
      try {
        const data = await login(this.user)
        // 存储登录的状态[vuex(其他外面可以继续读取到),本地(刷新后数据依然保留)]
        // this.$store.commit('setUser', data)
        this.setUser(data)
        // 跳转到首页并提示成功
        this.$router.push('/')
        this.$toast.fail('登录成功')
      } catch (err) {
        if (err.response && err.response.status === 400) {
          this.$toast.fail('手机号码或验证码错误')
        }
      }
    }
  },
  created () {
    // console.log(this)
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
