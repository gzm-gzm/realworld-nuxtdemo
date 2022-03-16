<template>
  <div>
    <form class="card comment-form">
      <div class="card-block">
        <textarea
          class="form-control"
          placeholder="Write a comment..."
          rows="3"
          required
          v-model="createComment"
        ></textarea>
      </div>
      <div class="card-footer">
        <img :src="user.image" class="comment-author-img" />
        <button class="btn btn-sm btn-primary" @click="clickArticleComment()">
          Post Comment
        </button>
      </div>
    </form>

    <div class="card" v-for="comment in comments" :key="comment.id">
      <div class="card-block">
        <p class="card-text">{{ comment.body }}</p>
      </div>
      <div class="card-footer">
        <nuxt-link
          class="comment-author"
          :to="{
            name: 'profile',
            params: {
              username: comment.author.username,
            },
          }"
        >
          <img :src="comment.author.image" class="comment-author-img" />
        </nuxt-link>
        &nbsp;
        <nuxt-link
          class="comment-author"
          :to="{
            name: 'profile',
            params: {
              username: comment.author.username,
            },
          }"
        >
          {{ comment.author.username }}
        </nuxt-link>
        <span class="date-posted">{{
          comment.createdAt | date("MMM DD, YYYY")
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticleComments, createArticleComment } from "../../../api/article";
import { mapState } from "vuex";
export default {
  name: "ArticleComments",
  computed: {
    ...mapState(["user"]),
  },
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      comments: [],
      createComment: "",
    };
  },
  async mounted() {
    const { data } = await getArticleComments(this.article.slug);
    this.comments = data.comments;
  },
  methods: {
    async clickArticleComment() {
      const comment = {
        body: this.createComment,
      };
      const { data } = await createArticleComment(this.article.slug, comment);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>