<template>
  <div class="hello">
    <div class="box">
      <h1>todos</h1>
      <div class="head">
        <input type="checkbox" @click="allDone" />
        <input type="text" @keyup.enter="addTodo" v-model="inputTodo" />
      </div>

      <ul>
        <li
          v-for="(i, idx) in listFilters"
          :key="idx"
          :class="{ done: i.done }"
        >
          <input type="checkbox" @click="change(idx)" :checked="i.done" />{{
            i.txt
          }}
          <span @click="remove(idx)">X</span>
        </li>
      </ul>
      <div class="foot">
        <span>{{ leftNum }} items left</span>
        <div class="foot-btn">
          <span
            @click="filt('all')"
            :class="[itemFilter === 'all' ? selected : '']"
            >all</span
          >
          <span
            @click="filt('active')"
            :class="[itemFilter === 'active' ? selected : '']"
            >active</span
          >
          <span
            @click="filt('completed')"
            :class="[itemFilter === 'completed' ? selected : '']"
            >completed</span
          >
          <span @click="clear" :class="{ notShow: todos.length === leftNum }"
            >clear</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";
export default {
  name: "HelloWorld",
  data() {
    return {
      inputTodo: "",
      selected: "btn_selected",
      done: "completed",
    };
  },
  computed: {
    ...mapState(["todos", "itemFilter"]),
    ...mapGetters(["listFilters", "leftNum"]),
  },
  methods: {
    addTodo() {
      if (this.inputTodo.trim() === "") {
        return;
      }
      this.$store.commit("ADD_TODOS", this.inputTodo);
      this.inputTodo = "";
    },
    ...mapMutations({
      change: "CHANGE_TODOS",
      filt: "FILTER",
      clear: "CLEAR_TODOS",
      remove: "REMOVE_TODO",
      allDone: "ALL_DONE",
    }),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box {
  margin: 100px 30%;
  border-top: 1px solid lightgray;
  border-left: 1px solid lightgray;
  border-right: 1px solid lightgray;
  background-color: rgb(247, 243, 243);
  padding: 5px 5% 100px;
}
.head {
  display: flex;
  /* justify-content: center; */
  align-items: center;
}
.head input[type="text"] {
  width: 100%;
  height: 90%;
  border: 1px solid transparent;
}
.head,
.foot,
ul {
  background-color: white;
}
.head,
li {
  border-bottom: 1px solid lightgrey;
  height: 50px;
  line-height: 50px;
}
.done {
  color: lightgray;
  text-decoration: line-through;
}
span:hover {
  cursor: default;
}
ul {
  list-style: none;
  padding: 0;
}

li span {
  display: none;
}
li input[type="checkbox"] {
  margin-right: 20px;
}
li:hover span {
  display: inline-block;
}
.notShow {
  display: none;
}
.foot {
  border-bottom: 1px solid lightgrey;
  height: 35px;
  line-height: 35px;
  color: rgb(185, 182, 182);
}
.foot-btn {
  display: inline-block;
  margin-left: 50px;
}
.foot-btn span {
  margin-right: 10px;
  padding: 0 5px;
}
.foot-btn span:hover {
  border: 1px solid rgb(245, 231, 232);
}

h1 {
  margin-left: 30%;
  font-size: 50px;
  color: lightpink;
}
li span {
  margin-right: 30px;
  float: right;
  color: rgb(212, 182, 182);
}
.btn_selected {
  border: 1px solid rgb(243, 203, 209);
}
.completed {
  text-decoration: line-through;
  color: lightgray;
}
</style>
