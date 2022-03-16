<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                  v-model="image"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                  v-model="username"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                  v-model="bio"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                  v-model="email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  v-model="password"
                />
              </fieldset>
              <button
                class="btn btn-lg btn-primary pull-xs-right"
                @click="onSubmit()"
              >
                Update Settings
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserInfo, updateUserInfo } from "../../api/user";
import { mapState } from "vuex";
export default {
  name: "SettingIndex",
  computed: {
    ...mapState(["user"]),
  },
  data() {
    return {
      password: "",
      email: "",
      bio: "",
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
      this.bio = bio;
    } catch (error) {
      this.email = this.user.email;
      this.image = this.user.image;
      this.username = this.user.username;
      this.bio = null;
    }
  },
  methods: {
    async onSubmit() {
      await updateUserInfo({
        email: this.email,
        image: this.image,
        username: this.username,
        bio: this.bio,
        token: this.user.token,
      });

      this.$router.push("/settings");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>