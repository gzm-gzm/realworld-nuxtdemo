<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>

        <article-meta :article="article" />
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12" v-html="article.body" />
      </div>

      <hr />

      <div class="article-actions">
        <article-meta :article="article" />
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <article-comments :article="article" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticleDetail } from "../../api/article";
import MarkdownIt from "markdown-it";
import ArticleMeta from "./components/article-meta.vue";
import ArticleComments from "./components/article-comments.vue";
export default {
  name: "ArticleIndex",
  components: {
    ArticleMeta,
    ArticleComments,
  },

  // 网页头部名称
  head() {
    return {
      title: `${this.article.title} - RealWorld`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.article.description,
        },
      ],
    };
  },
  async asyncData({ params }) {
    const { data = {} } = await getArticleDetail(params.slug);
    const { article } = data;

    if (data.article) {
      const md = new MarkdownIt();
      // 传输的是markdown类型的字符串
      article.body = md.render(article.body);
    }

    return {
      article: article || {},
    };
  },
};
</script>

<style lang="scss" scoped>
</style>