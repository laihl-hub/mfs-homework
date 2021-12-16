<template>
  <div class="box">
    <h4>近期文章</h4>
    <span class="item" v-for="(article, index) in latests" :key="index">
      <router-link
        :to="{ name: 'latestAticleDel', params: { id: article.id } }"
        >{{ article.title }}</router-link
      >
    </span>
  </div>
</template>

<script>
export default {
  name: "latestArticles",
  props: ["latests"],
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