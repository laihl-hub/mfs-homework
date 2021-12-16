<template>
  <div class="box">
    <h4>文章归档</h4>
    <span class="item" v-for="(item, index) in kinds" :key="index"
      ><router-link :to="{ name: 'HomeWithParams', params: { kind: item } }">{{
        formated[index]
      }}</router-link></span
    >
  </div>
</template>

<script>
export default {
  name: "list",
  props: ["kinds"],
  data() {
    return {
      formated: "",
    };
  },
  created() {
    this.formatTime();
  },
  methods: {
    formatTime() {
      this.formated = this.kinds.map((i) => {
        let str = i.replace("-", "年");
        let idx = str.indexOf("-");
        if (idx != -1) {
          str = str.slice(0, idx);
        }
        return (str = str + "月");
      });
    },
  },
};
</script>

<style scoped>
.box {
  padding: 20px;
  /* background-color: lightsteelblue; */
  border-bottom: 2px solid lightgray;
  margin: 10px;
}
.item {
  display: block;
  margin-top: 10px;
}
</style>