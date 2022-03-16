<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit 0.1.2</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item" v-if="user">
                <nuxt-link
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'your_feed',
                    },
                  }"
                  class="nav-link"
                  exact
                  :class="{
                    active: tab === 'your_feed',
                  }"
                >
                  Your Feed
                </nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{
                    active: tab === 'global_feed',
                  }"
                  exact
                  :to="{
                    name: 'home',
                  }"
                  >Global Feed</nuxt-link
                >
              </li>
              <li class="nav-item" v-if="tag">
                <nuxt-link
                  class="nav-link"
                  :class="{
                    active: tab === 'tag',
                  }"
                  exact
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'tag',
                      tag: tag,
                    },
                  }"
                  ># {{ tag }}</nuxt-link
                >
              </li>
            </ul>
          </div>

          <template v-if="articles.length">
            <div
              class="article-preview"
              v-for="article in articles"
              :key="article.slug"
            >
              <div class="article-meta">
                <nuxt-link
                  :to="{
                    name: 'profile',
                    params: {
                      username: article.author.username,
                    },
                  }"
                >
                  <img :src="article.author.image" />
                </nuxt-link>
                <div class="info">
                  <nuxt-link
                    class="author"
                    :to="{
                      name: 'profile',
                      params: {
                        username: article.author.username,
                      },
                    }"
                  >
                    {{ article.author.username }}
                  </nuxt-link>
                  <span class="date">{{ article.createdAt | date }}</span>
                </div>
                <button
                  class="btn btn-outline-primary btn-sm pull-xs-right"
                  @click="onFavorite(article)"
                  :disabled="article.disable"
                  :class="{
                    active: article.favorited,
                  }"
                >
                  <i class="ion-heart"></i> {{ article.favoritesCount }}
                </button>
              </div>
              <nuxt-link
                class="preview-link"
                :to="{
                  name: 'article',
                  params: {
                    slug: article.slug,
                  },
                }"
              >
                <h1>{{ article.title }}</h1>
                <p>{{ article.description }}</p>
                <span>Read more...</span>
              </nuxt-link>
            </div>
          </template>

          <template v-else>
            <span>暂无数据</span>
          </template>

          <!-- 分页列表 -->
          <nav>
            <ul class="pagination">
              <li
                class="page-item"
                :class="{
                  active: item === page,
                }"
                v-for="item in totalPage"
                :key="item"
              >
                <nuxt-link
                  class="page-link"
                  :to="{
                    name: 'home',
                    query: {
                      page: item,
                      tag: $route.query.tag,
                      tab: tab, // 切换页码的时候和展示类型对应
                    },
                  }"
                  >{{ item }}</nuxt-link
                >
              </li>
            </ul>
          </nav>
          <!-- /分页列表 -->
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <nuxt-link
                :to="{
                  name: 'home',
                  query: {
                    tag: item,
                    tab: 'tag',
                  },
                }"
                v-for="item in tags"
                class="tag-pill tag-default"
                :key="item"
              >
                {{ item }}
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getArticles,
  getFeedArticles,
  addFavorite,
  deleteFavorite,
} from "../../api/article";
import { getTags } from "../../api/tag";
import { mapState } from "vuex";

export default {
  name: "HomdeIndex",
  /** 属性更新，重新触发方法 **/
  // nuxt 内部提供的api //启用分页
  watchQuery: ["page", "tag", "tab"],
  computed: {
    ...mapState(["user"]),
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit);
    },
  },
  methods: {
    async onFavorite(article) {
      article.disable = true;
      if (article.favorited) {
         // 取消点赞
        await deleteFavorite(article.slug);
        article.favorited = false;
        article.favoritesCount += -1;
      } else {
        // 添加点赞
        await addFavorite(article.slug);
        article.favorited = true;
        article.favoritesCount += 1;
      }
      article.disable = false;
    },
  },
 // 如果需要SEO就写在这个生命周期里面
  async asyncData({ query, store }) {
    const limit = 5,
      page = Number.parseInt(query.page) || 1,
      { tag } = query,
      tab = query.tab || "global_feed",
      { state } = store;

    const loadArticles =
      state.user && tab === "your_feed" ? getFeedArticles : getArticles;

    const [articleRes, tagRes] = await Promise.all([
      loadArticles({
        limit,
        offset: (page - 1) * limit,
        tag: tag,
      }),
      getTags(),
    ]);

    const { articlesCount, articles } = articleRes.data,
      { tags } = tagRes.data;

    // 点赞时因为网络原因可能导致点击和取消点赞连续点击时，出现不可预料的问题
    // 在上次操作未结束前，取消掉操作事件，操作完成后再恢复
    articles.forEach((article) => (article.disable = false));
    return {
      articlesCount,// 文章总数
      articles,// 文章列表
      limit,// 每页大小
      page,// 页码
      tags,// 标签列表
      tag,// 数据标签
      tab,// 选项卡
    };
  },
};
</script>

<style lang="scss" scoped>
</style>