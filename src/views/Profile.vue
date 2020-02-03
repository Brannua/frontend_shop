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
          <van-button type="primary" size="large">登录</van-button>
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
            this.registUserName = this.registPassWord = '';
          } else {
            this.$toast.fail("注册失败");
          }
        })
        .catch(err => {
          this.$toast.fail("注册失败");
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss">
</style>
