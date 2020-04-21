<template>
  <div>
    <van-tabs>
      <van-tab title="登录">
        <van-cell-group>
          <van-field required clearable label="用户名" v-model="loginUserName" placeholder="请输入用户名" />
          <van-field required clearable label="密码" v-model="loginPassWord" placeholder="请输入密码" type="password" />
        </van-cell-group>
        <div>
          <van-button type="primary" size="large" @click="loginHandler">登录</van-button>
        </div>
      </van-tab>

      <van-tab title="注册">
        <van-cell-group>
          <van-field required clearable label="用户名" v-model="registUserName" placeholder="请输入用户名" />
          <van-field required clearable label="密码" v-model="registPassWord" placeholder="请输入密码" type="password" />
        </van-cell-group>
        <div>
          <van-button type="info" size="large" @click="registHandler">注册</van-button>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>

import api from "@/service.config.js"
import { mapActions } from 'vuex' // 映射 vuex 中的所有 action

export default {
  data() {
    return {
      loginUserName: "",
      loginPassWord: "",
      registUserName: "",
      registPassWord: ""
    }
  },
  methods: {
    ...mapActions(['loginAction']), // 加载指定名称的 action 方法
    /**
     * @description 用户注册
     */
    registHandler() {

      const {registUserName, registPassWord} = this

      this.$axios({
        method: "post",
        url: api.registUser,
        data: {
          userName: registUserName,
          passWord: registPassWord
        }
      })
        .then((res) => {
          if (res.data.code == 200) {
            this.$toast.success("注册成功")
            this.registUserName = ""
            this.registPassWord = ""
            return
          }
          this.$toast.fail("注册失败")
        })
        .catch(() => {
          this.$toast.fail("注册失败")
        })
    },

    /**
     * @description 用户登录
     */
    loginHandler() {

      const {loginUserName, loginPassWord} = this

      this.$axios({
        method: "post",
        url: api.loginUser,
        data: {
          userName: loginUserName,
          passWord: loginPassWord
        }
      })
        .then((res) => {

          const {data} = res
          const {code, userInfo} = data

          if (code == 200) {
            this.$toast.success("登陆成功")
            this.loginAction(userInfo)  // 保存用户信息
            this.$router.go(-1) // 跳转回上一页
            return
          }

          switch (code) {
            case 401:
              this.$toast.fail("密码错误")
              break
            case 404:
              this.$toast.fail("用户名不存在")
              break
            default:
              break
          }

        })
        .catch(() => {
          this.$toast.fail("登陆失败")
        })
    }
  }
}
</script>
