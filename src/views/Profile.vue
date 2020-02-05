<template>
  <div>
    <van-tabs>
      <van-tab title="登录">
        <van-cell-group>
          <van-field required clearable label="用户名" v-model="loginUserName" placeholder="请输入用户名" />
          <van-field
            required
            clearable
            label="密码"
            v-model="loginPassWord"
            type="password"
            placeholder="请输入密码"
          />
        </van-cell-group>
        <div>
          <van-button type="primary" size="large" @click="loginHandler">登录</van-button>
        </div>
      </van-tab>

      <van-tab title="注册">
        <van-cell-group>
          <van-field required clearable label="用户名" v-model="registUserName" placeholder="请输入用户名" />
          <van-field
            required
            clearable
            label="密码"
            v-model="registPassWord"
            type="password"
            placeholder="请输入密码"
          />
        </van-cell-group>
        <div>
          <van-button type="info" size="large" @click="registHandler">注册</van-button>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import api from "@/service.config.js";
import { mapActions } from 'vuex'; // 映射 vuex 中的所有 action
export default {
  data() {
    return {
      loginUserName: "",
      loginPassWord: "",
      registUserName: "",
      registPassWord: ""
    };
  },
  methods: {
    ...mapActions(['loginAction']), // 加载指定名称的 action 方法
    registHandler() {
      this.$axios({
        method: "post",
        url: api.registUser,
        data: {
          userName: this.registUserName,
          passWord: this.registPassWord
        }
      })
        .then(res => {
          if (res.data.code == 200) {
            this.$toast.success("注册成功");
            this.registUserName = this.registPassWord = "";
          } else {
            this.$toast.fail("注册失败");
          }
        })
        .catch(err => {
          this.$toast.fail("注册失败");
          console.error(err);
        });
    },
    loginHandler() {
      this.$axios({
        method: "post",
        url: api.loginUser,
        data: {
          userName: this.loginUserName,
          passWord: this.loginPassWord
        }
      })
        .then(res => {
          if (res.data.code == 200) {
            this.$toast.success("登陆成功");
            // 保存用户信息
            this.loginAction(this.loginUserName);
            // 跳转首页
            this.$router.push('/');
          } else {
            res.data.code == 404 && this.$toast.fail("用户名不存在");
            res.data.code == 401 && this.$toast.fail("密码错误");
          }
        })
        .catch(err => {
          this.$toast.fail("登陆失败");
          console.error(err);
        });
    }
  }
};
</script>

<style lang="scss">
</style>
