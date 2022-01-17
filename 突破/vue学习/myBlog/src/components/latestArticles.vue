<template>
  <div class="box">
    <h4>近期文章</h4>
    <span class="item" v-for="(article, index) in latestArticles" :key="index">
      <router-link
        :to="{ name: 'latestAticleDel', params: { id: article.id } }"
        >{{ article.title }}</router-link
      >
    </span>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "latestArticles",
  // props: ["latests"],
  data() {
    return {
      latestArticles: {},
    };
  },
  created() {
    this.getLatestArticles();
  },
  methods: {
    getLatestArticles() {
      axios.get("http://localhost:3000/api/latest-article").then((res) => {
        if (res.data.code === 0) {
          this.latestArticles = res.data.data;
        }
      });
    },
  },
};
</script>

<style  scoped>
.box {
  padding: 20px;
  /* background-color: lightsteelblue; */
  margin: 10px;
  border-bottom: 2px solid lightgray;
}
.item {
  display: block;
  margin-top: 10px;
}
</style>