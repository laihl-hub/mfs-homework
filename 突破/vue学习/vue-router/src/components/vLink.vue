<template>
  <div :class="{ active: isActive }">
    <a @click="change" :href="href">
      <slot></slot>
    </a>
  </div>
</template>

<script>
export default {
  name: "vLink",
  props: {
    href: {
      type: String,
      required: true,
    },
  },
  computed: {
    isActive() {
      return this.$root.currentRoute === this.href;
    },
  },
  methods: {
    change(e) {
      e.preventDefault();
      let path = this.href;
      this.$root.currentRoute = path;
      window.history.pushState(null, null, path);
      //   this.$emit("myClick", path);
    },
  },
};
</script>

<style scoped>
div {
  display: inline-block;
  width: 100%;
  height: 100%;
}
.active {
  background-color: lightpink;
  font-weight: bold;
}
</style>