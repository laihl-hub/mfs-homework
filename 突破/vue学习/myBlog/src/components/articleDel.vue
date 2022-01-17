<template>
  <div class="content">
    <h3>{{ curArticle.title }}</h3>
    <p class="info">
      <span v-for="(item, index) in tags" :key="index">{{ item.name }}</span
      ><span class="circle"></span
      ><span>{{ curArticle.createdAt | dateTime("YYYY-MM-DD") }}</span
      ><span class="circle"></span><span>浏览 {{ curArticle.viewTimes }}</span>
      <!-- <router-link :to="{ name: 'articleEdit', params: { id: curArticle.id } }"
        >编辑</router-link
      > -->
    </p>
    <p class="context" v-html="curArticle.del"></p>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "articleDel",
  data() {
    return {
      curArticle: "",
      tags: [{ name: "" }],
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
      let id = this.$route.params.id;

      axios.get("http://localhost:3000/api/article/" + id).then((res) => {
        if (res.data.code === 0) {
          this.curArticle = res.data.data;
          this.tags = res.data.data.tags;
        } else if (res.data.code === 1) {
          this.$router.push({ path: "/404NotFound" });
        }
      });
      // }
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