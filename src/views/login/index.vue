<template>
  <div class="login-container">
    <van-nav-bar
      class="app-nav-bar"
      title="登录 / 注册"
      left-arrow
      @click-left="$router.back()"
    />

    <!-- 登录表单 -->
    <van-form @submit="onLogin">
      <van-field
        v-model="user.mobile"
        icon-prefix="iconfont icon"
        left-icon="shouji"
        placeholder="请输入手机号"
        :rules="fromRules.mobile"
      />
      <van-field
        v-model="user.code"
        clearable
        icon-prefix="iconfont icon"
        left-icon="yanzhengma"
        placeholder="请输入验证码"
        :rules="fromRules.code"
      >
      <template #button>
        <van-button class="send-btn" size="small" round>发送验证码</van-button>
      </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" type="info" block>登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>

import { login } from '@/api/user'
import { Toast } from 'vant'

export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        // 手机号
        mobile: '',
        // 验证码
        code: ''
      },
      fromRules: {
        mobile: [
          { required: true, message: '请输入手机号' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '手机号格式错误' }
        ],
        code: [
          { required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onLogin () {
      Toast.loading({
        // 提示文本
        message: '登录中...',
        // 禁止背景点击
        forbidClick: true,
        // 展示时长
        duration: 0
      })
      // 1.找到数据接口
      // 2.封装请求方法
      // 3.请求调用登录
      try {
        const res = await login(this.user)
        // 4.处理响应结果
        console.log(res)
        Toast.success('登录成功')
      } catch (err) {
        console.log(err)
        Toast.fail('登录失败,手机号或验证码错误')
      }
    }
  }
}
</script>
<style scoped lang="less">
.login-container {
  .send-btn {
    width: 76px;
    height: 23px;
    background-color: #ededed;
    .van-button__text {
      font-size: 11px;
      color: #666;
    }
  }
  .login-btn-wrap {
    padding: 26px 16px;
    .login-btn {
      background-color: #6bd4fb;
      border: none;
      .van-button__text {
        font-size: 15px;
      }
    }
  }
}
</style>
