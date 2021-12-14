<template>
  <div id="app">
    <span>{{ total }}</span>
    <!-- <router-view/> -->
    <!-- <hello-world /> -->
    <myBtn @btnChange="sum"></myBtn>
    <myBtn @btnChange="sum"></myBtn>
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
import myBtn from "./components/my-btn.vue";
export default {
  name: "App",
  data() {
    return {
      total: 0,
    };
  },
  methods: {
    sum() {
      this.total++;
    },
  },
  components: { myBtn },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
span {
  display: block;
  margin-bottom: 20px;
  font-size: 30px;
}
</style>
