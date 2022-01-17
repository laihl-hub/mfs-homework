<template>
  <div
    class="container"
    v-infinite-scroll="loadMore"
    infinite-scroll-disabled="busy"
    infinite-scroll-distance="10"
  >
    <div class="item" v-for="(item, index) in shows" :key="index">
      <article-intro :article="item"></article-intro>
    </div>
  </div>
</template>

<script>
import articleIntro from "./articleIntro.vue";
import axios from "axios";
export default {
  name: "Home",
  components: { articleIntro },
  data() {
    return {
      articles: [],
      shows: [],
      offset: 0,
      pageSize: 10,
      total: 1,
      filter: {},
    };
  },
  created() {
    // this.articles = this.$parent.articles;
    // this.getArticles();
    // this.fetchData();
    // console.log(this.shows);
  },
  watch: {
    $route: "reset",
  },
  computed: {
    getarticle() {
      return this.shows;
    },
  },
  methods: {
    reset() {
      console.log(111111);
      this.articles = [];
      this.offset = 0;
      this.total = 1;
      this.loadMore();
    },
    getArticles() {
      let url = "";
      if (this.$route.params.id != undefined) {
        console.log(22222);
        let id = this.$route.params.id;
        url =
          "http://localhost:3000/api/tags/" +
          id +
          "/article?offset=" +
          this.offset +
          "&pageSize=" +
          this.pageSize;
      } else {
        if (this.$route.params.kind != undefined) {
          // console.log(kind);
          let kind = this.$route.params.kind;
          // console.log(kind);
          kind = new Date(kind);
          // console.log(kind.getDay();
          // console.log(kind.getFullYear());
          let str1 =
            kind.getFullYear() + "-" + (kind.getMonth() + 1) + "-01 08:00:00";
          console.log(str1);
          let next = new Date(kind.setMonth(kind.getMonth() + 1));
          let str2 =
            next.getFullYear() + "-" + (next.getMonth() + 1) + "-01 08:00:00";
          console.log(str2);
          // console.log(next);
          // console.log(kind);
          this.filter = [str1, str2];
        } else {
        }
        console.log(3333);
        url =
          "http://localhost:3000/api/article?offset=" +
          this.offset +
          "&pageSize=" +
          this.pageSize +
          "&filter=" +
          JSON.stringify(this.filter);
      }
      axios.get(url).then((res) => {
        // console.log(res);
        if (res.data.code === 0) {
          // if (res.data.pagination) {
          this.total = res.data.pagination.total;
          // }

          this.articles = [...this.articles, ...res.data.data];
          this.offset = this.articles.length;
          console.log(this.offset);
          this.fetchData();
          console.log(res.data);
          this.filter = {};
        } else {
          console.log(res.data.msg);
        }
      });
    },

    fetchData() {
      this.shows = this.dataFilter();
      // console.log(this.$route.params);
    },
    dataFilter() {
      if (this.$route.params.id != undefined) {
        // return this.articles.filter()
        return this.articles;
      }
      if (this.$route.params.kind != undefined) {
        let param = this.$route.params.kind;
        return this.articles.filter(
          (item) => item.createdAt.indexOf(param) != -1
        );
      } else {
        return this.articles;
      }
    },
    loadMore() {
      // console.log(this.offset);

      if (this.offset >= this.total) {
        console.log(this.offset);
        console.log(44444);
      } else {
        console.log(this.offset);
        this.getArticles();
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