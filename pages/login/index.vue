<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ isLogin ? "Sign in" : "Sign up" }}</h1>
          <p class="text-xs-center">
            <nuxt-link v-if="isLogin" to="/register"
              >Need an account?</nuxt-link
            >
            <nuxt-link v-else to="/login">Have an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <!-- 使用template不会额外的生成dom节点 -->
            <!-- 先遍历最外层的对象 -->
            <template v-for="(messages, field) in errors">
              <li v-for="(message, index) in messages" :key="index">
                {{ field }} {{ message }}
              </li>
            </template>
          </ul>

          <!-- prevent 阻止默认行为 -->
          <form @submit.prevent="onSubmit()">
            <fieldset class="form-group" v-if="!isLogin">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
                required
                v-model="user.username"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="email"
                placeholder="Email"
                v-model="user.email"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                v-model="user.password"
                minlength="8"
                required
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{ isLogin ? "Sign in" : "Sign up" }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from "../../api/user";

/** 客户端 **/
// 仅在客户端加载 js-cookie包 
// process.client 是nuxt提供的 如果是true就运行在客户端 否是是服务端
const Cookie = process.client ? require("js-cookie") : undefined;

export default {
  name: "loginIndex",
  // 通过计算属性 
  computed: {
     // 根据路径判断是否跳转登录或者注册
    isLogin() {
      return this.$route.name === "login";
    },
  },
  data() {
    return {
      user: {
        password: "",
        email: "",
        username: "",
      },
      errors: {}, // 登录错误信息
    };
  },
  methods: {
    // 把登录和注册放在一个方法里
    async onSubmit() {
      try {
        // 提交表单请求登录
        const { data } = this.isLogin
          ? await login({
              user: this.user,
            })
          : await register({
              user: this.user,
            });

        // 存储登录状态 注意服务端渲染可能也要存储 只是单纯的存储在客户端可能无法满足业务需求
        // 保存用户的登录状态
        this.$store.commit("setUser", data.user);

        // 为了防止刷新 数据丢失， 数据需要持久化
        Cookie.set('user', JSON.stringify(data.user));
        // 跳转到首页
        this.$router.push("/");
      } catch (error) {
        this.errors = error?.response?.data?.errors;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>