<template>
  <div>
    <!-- 顶部导航栏 -->
    <nav class="navbar navbar-light">
      <div class="container">
        <nuxt-link class="navbar-brand" to="/">conduit</nuxt-link>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <!-- Add "active" class when you're on that page" -->
            <!-- 增加严格匹配 不然点击/:id 都会有这个路由规则  -->
             <!-- exact 精确匹配(就是属性名必须等于/ 才会高亮) -->
            <nuxt-link class="nav-link" to="/" exact>Home</nuxt-link>
          </li>

          <template v-if="user">
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/editor">
                <i class="ion-compose"></i>&nbsp;New Article
              </nuxt-link>
            </li>

            <li class="nav-item">
              <nuxt-link class="nav-link" to="/settings">
                <i class="ion-gear-a"></i>&nbsp;Settings
              </nuxt-link>
            </li>

            <li class="nav-item">
              <nuxt-link
                class="nav-link"
                :to="{
                  name: 'profile',
                  params: {
                    username: email,
                  },
                }"
              >
                <img class="user-pic" :src="image" />
                {{ username }}
              </nuxt-link>
            </li>
          </template>

          <template v-else>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/login">Sign in</nuxt-link>
            </li>

            <li class="nav-item">
              <nuxt-link class="nav-link" to="/register">Sign up</nuxt-link>
            </li>
          </template>
        </ul>
      </div>
    </nav>
    <!-- /顶部导航栏 -->

    <!-- 子路由 -->
    <nuxt-child />
    <!-- /子路由 -->

    <!-- 底部 -->
    <footer>
      <div class="container">
        <a href="/" class="logo-font">conduit</a>
        <span class="attribution">
          An interactive learning project from
          <a href="https://thinkster.io">Thinkster</a>. Code &amp; design
          licensed under MIT.
        </span>
      </div>
    </footer>
    <!-- /底部 -->
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getUserInfo } from "../../api/user";

export default {
  name: "LayoutIndex",
  computed: {
    ...mapState(["user"]),
  },
  data() {
    return {
      email: "",
      username: "",
      image: "",
    };
  },
  async mounted() {
    try {
      const { data } = await getUserInfo();
      const { email, image, username, bio } = data.user;
      this.email = email;
      this.image = image;
      this.username = username;
    } catch (error) {
      this.email = this.user?.email;
      this.image = this.user?.image;
      this.username = this.user?.username;
    }
  },
};
</script>

<style lang="scss" scoped>
</style>