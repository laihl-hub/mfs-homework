<template>
  <div class="box">
    <h4>标签</h4>
    <span
      class="item"
      v-for="(item, index) in tags"
      :key="index"
      @click="selectedByTag(index)"
      >{{ item.name }}</span
    >
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "tags",
  // props: ["items"],
  data() {
    return {
      tags: [{ name: "" }],
    };
  },
  created() {
    this.getTags();
  },
  methods: {
    getTags() {
      axios.get("http://localhost:3000/api/tags").then((res) => {
        if (res.data.code === 0) {
          this.tags = res.data.data;
        }
      });
    },
    selectedByTag(index) {
      let id = this.tags[index].id;
      this.$router.push({ name: "homeByTag", params: { id: id } });
    },
  },
};
</script>

<style scoped>
.box {
  padding: 20px;
  /* background-color: lightsteelblue; */
  margin: 10px;
}
.item {
  display: inline-block;
  /* width: 50px; */
  height: 30px;
  line-height: 30px;
  border: 2px solid rgb(172, 172, 162);
  border-radius: 3px;
  background-color: rgba(216, 235, 202, 0.5);
  margin-top: 10px;
  margin-right: 5px;
  padding: 0 5px;
}
.item:hover {
  cursor: pointer;
}
</style>