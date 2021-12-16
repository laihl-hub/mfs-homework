<template>
  <div class="content">
    <h3>{{ curArticle.title }}</h3>
    <p class="info">
      <span>前端</span><span class="circle"></span
      ><span>{{ curArticle.time }}</span
      ><span class="circle"></span><span>浏览 {{ curArticle.viewTimes }}</span>
    </p>
    <p class="context">
      {{ curArticle.del }}
    </p>
  </div>
</template>

<script>
export default {
  name: "articleDel",
  data() {
    return {
      curArticle: "",
    };
  },
  created() {
    // console.log(this.$route.params.id - 1);
    // console.log(this.$route.name.indexOf("latest"));
    // console.log(this.curArticle);
    this.fetchData();
  },
  watch: {
    $route: "fetchData",
  },
  methods: {
    fetchData() {
      if (this.$route.name.indexOf("latest") != -1) {
        this.curArticle = this.$parent.latest[this.$route.params.id - 1];
      } else {
        this.curArticle = this.$parent.articles[this.$route.params.id - 1];
      }
    },
  },
};
</script>

<style  scoped>
.content {
  padding: 10px 100px;
}
.content .context {
  text-align: left;
  text-indent: 2rem;
}
span {
  display: inline-block;
  margin-left: 5px;
}
.circle {
  display: inline-block;
  width: 2px;
  height: 2px;
  background-color: lightslategray;
  border: 2px solid lightslategray;
  border-radius: 50%;
  margin-bottom: 2px;
}
.info {
  height: 30px;
  line-height: 30px;
  /* margin: 0; */
}
</style>