<template>
  <div id="app">
    <!-- <img src="./assets/logo.png">
    <router-view/> -->
    <h1>vLink</h1>
    <header>
      <span><vLink href="/">home</vLink></span>
      <span><vLink href="/about">about</vLink></span>
    </header>

    <component :is="page"></component><br /><br />
    -----------------------------------<br />
    <h1>vue-router</h1>
    <h4>为了与vLink加以区别，vue-router使用的默认的hash模式</h4>
    <header>
      <span><router-link to="/">home</router-link></span>
      <span><router-link to="/about">about</router-link></span>
    </header>

    <router-view />
  </div>
</template>

<script>
import vLink from "./components/vLink.vue";
import Home from "./components/Home.vue";
import About from "./components/About.vue";
import NotFound from "./components/NotFound.vue";
const routes = {
  "/": Home,
  "/about": About,
};
export default {
  name: "App",
  data() {
    return {
      // curPage: "/",
    };
  },
  components: { vLink, Home, About, NotFound },
  computed: {
    page() {
      console.log(this.$root.currentRoute);
      let curCom = routes[this.$root.currentRoute] || NotFound;
      return curCom.name;
    },
  },
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
header {
  height: 50px;
  line-height: 50px;
  background-color: lightblue;
}
header span {
  display: inline-block;
  width: 100px;
  height: 100%;
  margin-right: 20px;
}
a {
  text-decoration: none;
  color: #2c3e50;
}
.router-link-exact-active {
  display: inline-block;
  width: 100%;
  height: 100%;
  background-color: lightpink;
}
</style>
