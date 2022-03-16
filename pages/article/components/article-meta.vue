<template>
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
        :to="{
          name: 'profile',
          params: {
            username: article.author.username,
          },
        }"
      >
        {{ article.author.username }}
      </nuxt-link>
      <span class="date">{{ article.createdAt | date("MMM DD,YYYY") }}</span>
    </div>
    <template v-if="article.author.username !== user.username">
      <button
        class="btn btn-sm btn-outline-secondary"
        :class="{ active: article.author.following }"
      >
        <i class="ion-plus-round"></i>
        &nbsp; Follow Eric Simons
        <span class="counter">{{ article.followedBy.length }}</span>
      </button>
      &nbsp;&nbsp;
      <button
        class="btn btn-sm btn-outline-primary"
        :class="{ active: article.favorited }"
      >
        <i class="ion-heart"></i>
        &nbsp; Favorite Post
        <span class="counter">{{ article.favoritesCount }}</span>
      </button>
    </template>

    <template v-else>
      <nuxt-link
        class="btn btn-outline-secondary btn-sm"
        :to="{
          name: 'modify',
          params: {
            title: article.slug,
          },
        }"
      >
        <i class="ion-edit"></i> Edit Article
      </nuxt-link>

      <button
        class="btn btn-outline-danger btn-sm"
        :class="{ disabled: isDeleting }"
        @click="clickDeleteArticle()"
      >
        <i class="ion-trash-a"></i> Delete Article
      </button>
    </template>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { deleteArticle } from "../../../api/article";
export default {
  name: "articleMeta",
  data() {
    return {
      isDeleting: false,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    async clickDeleteArticle() {
      this.isDeleting = true;
      const { errors } = await deleteArticle(this.article.slug);

      if (!errors) {
        this.$router.push("/");
      }
      this.isDeleting = false;
    },
  },
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
</style>