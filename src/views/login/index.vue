<template>
  <div>
    <van-nav-bar title="登录" />
    <van-cell-group>
      <van-field left-icon="phone-o" placeholder="请输入手机号" />
    </van-cell-group>
    <van-cell-group>
      <van-field center left-icon="more-o" placeholder="请输入验证码">
        <van-button slot="button" size="small" type="default" round>获取验证码</van-button>
      </van-field>
    </van-cell-group>
    <div class="login-btn">
      <van-button type="default">登录</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      }
    }
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
