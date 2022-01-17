<template>
  <div class="box">
    <h3>{{ article.title }}</h3>
    <p class="info">
      <span v-for="(item, index) in getTags" :key="index">{{ item.name }}</span
      ><span class="circle"></span
      ><span>{{ article.createdAt | dateTime("YYYY-MM-DD") }}</span
      ><span class="circle"></span><span>浏览 {{ article.viewTimes }}</span>
      <!-- <button @click="deleteOne">删除</button> -->
    </p>
    <p class="content" v-html="article.intro"></p>
    <footer>
      <router-link :to="{ name: 'articleDel', params: { id: article.id } }"
        >查看文章</router-link
      >
    </footer>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "articleIntro",
  props: ["article"],
  data() {
    return {
      tags: [{ name: "" }],
      // formattedTime: "",
    };
  },
  created() {
    this.tags = this.article.tags;
    console.log(this.tags);
    // this.formatTime(this.article.createdAt);
  },
  computed: {
    getTags() {
      if (this.article.tags) {
        return this.article.tags;
      } else {
        return { name: "" };
      }
    },
  },
};
</script>

<style  scoped>
.box {
  /* background-color: lightsalmon; */
  padding: 10px;
  border: 2px solid lightgray;
  border-radius: 5px;
  margin-bottom: 50px;
}

.content {
  text-align: left;
  text-indent: 2rem;
}

a::before {
  content: "|";
  font-weight: bold;
  margin-right: 5px;
  font-size: 18px;
}
a::after {
  content: "|";
  font-weight: bold;
  margin-left: 5px;
  font-size: 18px;
}
/* .info {
  display: flex;
  justify-content: center;
  align-content: center;
} */
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