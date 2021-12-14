<template>
  <button @click="add">{{ counter }}</button>
</template>

<script>
export default {
  name: "myBtn",
  data() {
    return {
      counter: 0,
    };
  },
  methods: {
    add() {
      this.counter++;
      this.$emit("btnChange");
    },
  },
};
</script>

<style scoped>
button {
  width: 50px;
  height: 30px;
  background-color: rgb(218, 236, 247);
  margin-left: 3px;
  border-radius: 3px;
}
</style>