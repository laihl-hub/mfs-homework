<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <head-nav></head-nav>
    <div
      class="main"
      v-if="
        this.$route.path != '/about' && this.$route.path.indexOf('admin') == -1
      "
    >
      <div class="content"><router-view /></div>

      <div class="sideNav">
        <latest-articles></latest-articles>
        <list></list>
        <tags></tags>
      </div>
    </div>
    <div
      class="aboutBox"
      v-if="
        this.$route.path === '/about' || this.$route.path.indexOf('admin') != -1
      "
    >
      <router-view />
    </div>
  </div>
</template>

<script>
import headNav from "./components/headNav.vue";
import latestArticles from "./components/latestArticles.vue";
import list from "./components/list.vue";
import tags from "./components/tags.vue";
export default {
  name: "App",
  components: { headNav, latestArticles, list, tags },
  data() {
    return {
      // articles: [
      //   {
      //     id: 1,
      //     title: "动态路由匹配",
      //     time: "2021-09-11",
      //     viewTimes: 120,
      //     intro:
      //       "我们经常需要把某种模式匹配到的所有路由，全都映射到同个组件。例如，我们有一个 User 组件，对于所有 ID 各不相同的用户，都要使用这个组件来渲染。那么，我们可以在 vue-router 的路由路径中使用“动态路径参数”(dynamic segment) 来达到这个效果",
      //     del: "我们经常需要把某种模式匹配到的所有路由，全都映射到同个组件。例如，我们有一个 User 组件，对于所有 ID 各不相同的用户，都要使用这个组件来渲染。那么，我们可以在 vue-router 的路由路径中使用“动态路径参数”(dynamic segment) 来达到这个效果.一个“路径参数”使用冒号 : 标记。当匹配到一个路由时，参数值会被设置到 this.$route.params，可以在每个组件内使用。于是，我们可以更新 User 的模板，输出当前用户的 ID.你可以在一个路由中设置多段“路径参数”，对应的值都会设置到 $route.params 中",
      //   },
      //   {
      //     id: 2,
      //     title: "嵌套路由",
      //     time: "2021-09-20",
      //     viewTimes: 420,
      //     intro:
      //       "实际生活中的应用界面，通常由多层嵌套的组件组合而成。同样地，URL 中各段动态路径也按某种结构对应嵌套的各层组件,借助 vue-router，使用嵌套路由配置，就可以很简单地表达这种关系",
      //     del: "实际生活中的应用界面，通常由多层嵌套的组件组合而成。同样地，URL 中各段动态路径也按某种结构对应嵌套的各层组件,借助 vue-router，使用嵌套路由配置，就可以很简单地表达这种关系.这里的 <router-view> 是最顶层的出口，渲染最高级路由匹配到的组件。同样地，一个被渲染组件同样可以包含自己的嵌套 <router-view>。例如，在 User 组件的模板添加一个 <router-view>.要在嵌套的出口中渲染组件，需要在 VueRouter 的参数中使用 children 配置.要注意，以 / 开头的嵌套路径会被当作根路径。 这让你充分的使用嵌套组件而无须设置嵌套的路径",
      //   },
      //   {
      //     id: 3,
      //     title: "编程式的导航",
      //     time: "2021-09-21",
      //     viewTimes: 300,
      //     intro:
      //       "除了使用 <router-link> 创建 a 标签来定义导航链接，我们还可以借助 router 的实例方法，通过编写代码来实现。router.push(location, onComplete?, onAbort?).注意:在 Vue 实例内部，你可以通过 $router 访问路由实例。因此你可以调用 this.$router.push",
      //     del: '除了使用 <router-link> 创建 a 标签来定义导航链接，我们还可以借助 router 的实例方法，通过编写代码来实现。router.push(location, onComplete?, onAbort?).注意:在 Vue 实例内部，你可以通过 $router 访问路由实例。因此你可以调用 this.$router.push.想要导航到不同的 URL，则使用 router.push 方法。这个方法会向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，则回到之前的 URL。当你点击 <router-link> 时，这个方法会在内部调用，所以说，点击 <router-link :to="..."> 等同于调用 router.push(...)',
      //   },
      //   {
      //     id: 4,
      //     title: "命名路由",
      //     time: "2021-09-30",
      //     viewTimes: 500,
      //     intro:
      //       "有时候，通过一个名称来标识一个路由显得更方便一些，特别是在链接一个路由，或者是执行一些跳转的时候。你可以在创建 Router 实例的时候，在 routes 配置中给某个路由设置名称。",
      //     del: "有时候，通过一个名称来标识一个路由显得更方便一些，特别是在链接一个路由，或者是执行一些跳转的时候。你可以在创建 Router 实例的时候，在 routes 配置中给某个路由设置名称。要链接到一个命名路由，可以给 router-link 的 to 属性传一个对象,这跟代码调用 router.push() 是一回事,这两种方式都会把路由导航到 /user/123 路径",
      //   },
      //   {
      //     id: 5,
      //     title: "命名视图",
      //     time: "2021-10-09",
      //     viewTimes: 200,
      //     intro:
      //       "有时候想同时 (同级) 展示多个视图，而不是嵌套展示，例如创建一个布局，有 sidebar (侧导航) 和 main (主内容) 两个视图，这个时候命名视图就派上用场了。你可以在界面中拥有多个单独命名的视图，而不是只有一个单独的出口。如果 router-view 没有设置名字，那么默认为 default",
      //     del: "有时候想同时 (同级) 展示多个视图，而不是嵌套展示，例如创建一个布局，有 sidebar (侧导航) 和 main (主内容) 两个视图，这个时候命名视图就派上用场了。你可以在界面中拥有多个单独命名的视图，而不是只有一个单独的出口。如果 router-view 没有设置名字，那么默认为 default.一个视图使用一个组件渲染，因此对于同个路由，多个视图就需要多个组件。确保正确使用 components 配置 (带上 s)",
      //   },
      //   {
      //     id: 6,
      //     title: "重定向和别名",
      //     time: "2021-10-16",
      //     viewTimes: 300,
      //     intro:
      //       "重定向也是通过 routes 配置来完成，下面例子是从 /a 重定向到 /b,重定向的目标也可以是一个命名的路由",
      //     del: "重定向也是通过 routes 配置来完成，下面例子是从 /a 重定向到 /b,重定向的目标也可以是一个命名的路由.甚至是一个方法，动态返回重定向目标.注意导航守卫并没有应用在跳转路由上，而仅仅应用在其目标上。在下面这个例子中，为 /a 路由添加一个 beforeEnter 守卫并不会有任何效果。",
      //   },
      //   {
      //     id: 7,
      //     title: "路由组建传参",
      //     time: "2021-10-26",
      //     viewTimes: 310,
      //     intro:
      //       "在组件中使用 $route 会使之与其对应路由形成高度耦合，从而使组件只能在某些特定的 URL 上使用，限制了其灵活性。使用 props 将组件和路由解耦",
      //     del: "在组件中使用 $route 会使之与其对应路由形成高度耦合，从而使组件只能在某些特定的 URL 上使用，限制了其灵活性。使用 props 将组件和路由解耦.取代与 $route 的耦合,通过 props 解耦.这样你便可以在任何地方使用该组件，使得该组件更易于重用和测试",
      //   },
      //   {
      //     id: 8,
      //     title: "HTML5 History模式",
      //     time: "2021-11-06",
      //     viewTimes: 430,
      //     intro:
      //       "vue-router 默认 hash 模式 —— 使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载。如果不想要很丑的 hash，我们可以用路由的 history 模式，这种模式充分利用 history.pushState API 来完成 URL 跳转而无须重新加载页面。",
      //     del: "vue-router 默认 hash 模式 —— 使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载。如果不想要很丑的 hash，我们可以用路由的 history 模式，这种模式充分利用 history.pushState API 来完成 URL 跳转而无须重新加载页面。当你使用 history 模式时，URL 就像正常的 url，例如 http://yoursite.com/user/id，也好看!不过这种模式要玩好，还需要后台配置支持。因为我们的应用是个单页客户端应用，如果后台没有正确的配置，当用户在浏览器直接访问 http://oursite.com/user/id 就会返回 404，这就不好看了。所以呢，你要在服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回同一个 index.html 页面，这个页面就是你 app 依赖的页面。",
      //   },
      //   {
      //     id: 9,
      //     title: "路由守卫",
      //     time: "2021-11-23",
      //     viewTimes: 200,
      //     intro:
      //       "正如其名，vue-router 提供的导航守卫主要用来通过跳转或取消的方式守卫导航。有多种机会植入路由导航过程中:全局的, 单个路由独享的, 或者组件级的。",
      //     del: "正如其名，vue-router 提供的导航守卫主要用来通过跳转或取消的方式守卫导航。有多种机会植入路由导航过程中:全局的, 单个路由独享的, 或者组件级的。记住参数或查询的改变并不会触发进入/离开的导航守卫。你可以通过观察 $route 对象来应对这些变化，或使用 beforeRouteUpdate 的组件内守卫。",
      //   },
      //   {
      //     id: 10,
      //     title: "路由元信息",
      //     time: "2021-11-29",
      //     viewTimes: 220,
      //     intro:
      //       "定义路由的时候可以配置 meta 字段.那么如何访问这个 meta 字段呢？首先，我们称呼 routes 配置中的每个路由对象为 路由记录。路由记录可以是嵌套的，因此，当一个路由匹配成功后，他可能匹配多个路由记录.",
      //     del: "定义路由的时候可以配置 meta 字段.那么如何访问这个 meta 字段呢？首先，我们称呼 routes 配置中的每个路由对象为 路由记录。路由记录可以是嵌套的，因此，当一个路由匹配成功后，他可能匹配多个路由记录.例如，根据上面的路由配置，/foo/bar 这个 URL 将会匹配父路由记录以及子路由记录。一个路由匹配到的所有路由记录会暴露为 $route 对象 (还有在导航守卫中的路由对象) 的 $route.matched 数组。因此，我们需要遍历 $route.matched 来检查路由记录中的 meta 字段。",
      //   },
      // ],
      // latest: [
      //   {
      //     id: 1,
      //     title: "你不知道的Js上",
      //     time: "2021-12-12",
      //     viewTimes: 200,
      //     del: "啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊自己去买着看自己去买着看自己去买着看！！！支持原创！快去买快去买快去买！好看快去买",
      //   },
      //   {
      //     id: 2,
      //     title: "你不知道的Js中",
      //     time: "2021-12-15",
      //     viewTimes: 100,
      //     del: "啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊自己去买着看自己去买着看自己去买着看！！！支持原创！快去买快去买快去买！好看快去买",
      //   },
      //   {
      //     id: 3,
      //     title: "你不知道的Js下",
      //     time: "2021-12-16",
      //     viewTimes: 10,
      //     del: "啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊自己去买着看自己去买着看自己去买着看！！！支持原创！快去买快去买快去买！好看快去买",
      //   },
      // ],
      // classes: ["2021-09", "2021-10", "2021-11"],
      // tags: ["前端", "vue", "vue-router"],
    };
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
  display: flex;
  /* flex-wrap: wrap; */
  flex-direction: column;
  /* height: 100vh; */
  text-align: center;
  background-color: rgb(232, 237, 240);
}
h1,
h2,
h3,
h4 {
  padding: 0;
  margin: 0;
}
.main {
  display: flex;
  padding: 10px 50px;
}
.main .content {
  flex: 1;
}
.main .sideNav {
  width: 400px;
  /* height: 300px; */
  /* background-color: lightskyblue; */
  margin-left: 10px;
  padding: 5px;
}
a {
  text-decoration: none;
  color: rgb(112, 110, 110);
}
a:hover {
  color: #2c3e50;
}
.aboutBox {
  padding: 30px;
}
.router-link-exact-active {
  color: rgb(46, 45, 45);
  font-weight: bold;
}
</style>
