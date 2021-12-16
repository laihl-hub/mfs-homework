<template>
  <div class="container">
    <div class="item" v-for="(item, index) in shows" :key="index">
      <article-intro :article="item"></article-intro>
    </div>
  </div>
</template>

<script>
import articleIntro from "./articleIntro.vue";
export default {
  name: "Home",
  components: { articleIntro },
  data() {
    return {
      articles: [],
      shows: [],
    };
  },
  created() {
    this.articles = this.$parent.articles;
    this.fetchData();
  },
  watch: {
    $route: "fetchData",
  },
  methods: {
    fetchData() {
      this.shows = this.dataFilter();
      // console.log(this.$route.params);
    },
    dataFilter() {
      if (this.$route.params.kind === undefined) {
        return this.articles;
      } else {
        let param = this.$route.params.kind;
        return this.articles.filter((item) => item.time.indexOf(param) != -1);
      }
    },
  },
};
</script>

<style scoped>
.container {
  /* background-color: blanchedalmond; */
  padding: 0 100px;
}

.container .item {
  margin: 10px 0;
}
</style>