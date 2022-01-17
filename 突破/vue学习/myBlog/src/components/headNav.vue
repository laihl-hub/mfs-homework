<template>
  <div>
    <header>
      <div>
        <h1 style="display: inline-block">个人博客</h1>
        <el-tooltip
          class="item"
          content="发表文章"
          effect="light"
          placement="bottom"
        >
          <span @click="addBlog" style="margin-left: 50px"
            ><i
              class="el-icon-circle-plus-outline"
              style="
                font-size: 30px;

                color: rgb(110, 135, 168);
              "
            ></i
          ></span>
        </el-tooltip>
        <span style="margin-left: 50px">
          <span @click="login" v-if="!loginState">登录</span>
          <el-tooltip
            class="item"
            content="登出"
            effect="light"
            placement="bottom"
            v-else
          >
            <span
              @click="login"
              style="color: rgb(98, 154, 173); font-weight: bold"
              >{{ user.username }}</span
            ></el-tooltip
          >
        </span>
      </div>

      <div class="nav">
        <span><router-link to="/">主页</router-link></span>
        <span><router-link to="/about">关于</router-link></span>
        <span><router-link to="/admin">管理</router-link></span>
      </div>
    </header>

    <el-dialog
      :visible.sync="loginDialogShow"
      title="用户登录"
      width="30%"
      @close="loginClose"
    >
      <div class="form">
        <span class="inputBox"
          ><span class="label">用户名:</span
          ><el-input type="text" v-model="loginData.username"></el-input
        ></span>
        <span class="inputBox"
          ><span class="label">密码:</span
          ><el-input type="password" v-model="loginData.password"></el-input
        ></span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click.stop="confirmLogin" class="login">登录</el-button>
        <el-button @click.stop="loginDialogShow = false">取消</el-button>
        <el-button @click="openRegist" class="regist">注册</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="registDialogShow"
      width="30%"
      title="用户注册"
      @close="registClose"
    >
      <div class="form">
        <span class="inputBox"
          ><span class="label">用户名</span
          ><el-input type="text" v-model="registData.username"></el-input
        ></span>
        <span class="inputBox"
          ><span class="label">密码</span
          ><el-input type="password" v-model="registData.password"></el-input
        ></span>
        <span class="inputBox"
          ><span class="label">确认密码</span
          ><el-input type="password" v-model="repassword"></el-input
        ></span>
        <span class="inputBox"
          ><span class="label">email</span
          ><el-input type="text" v-model="registData.email"></el-input
        ></span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click.stop="regist" class="regist">注册</el-button>
        <el-button @click.stop="registDialogShow = false">取消</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="loginOutDialogShow" title="登出" width="30%">
      <span>确认登出？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click.stop="loginoutConfirm" class="confirm"
          >确认</el-button
        >
        <el-button @click.stop="loginOutDialogShow = false">取消</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="addDialogShow" width="55%" title="发表博客">
      <div>
        <article-editor
          :userId="user.id"
          @article="addDialogShow = false"
        ></article-editor>
      </div>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click.stop="addConfirm">确认</el-button>
        <el-button @click.stop="loginOutDialogShow = false">取消</el-button>
      </span> -->
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import articleEditor from "./articleEditor.vue";
export default {
  name: "headNav",
  data() {
    return {
      loginDialogShow: false,
      registDialogShow: false,
      loginOutDialogShow: false,
      addDialogShow: false,
      loginData: { username: "", password: "" },
      registData: { username: "", password: "", email: "" },
      repassword: "",
      loginState: false,
      user: {},
    };
  },
  async created() {
    let { data: res } = await axios.get("http://localhost:3000/api/session");
    if (!res.data.username) {
      this.loginState = false;
    } else {
      this.loginState = true;
      this.user = res.data;
      window.localStorage.setItem("userId", res.data.id);
    }
  },
  methods: {
    login() {
      if (!this.loginState) {
        this.loginDialogShow = true;
      } else {
        console.log(1111);
        this.loginOutDialogShow = true;
      }
    },
    loginoutConfirm() {
      axios.delete("http://localhost:3000/api/session").then((res) => {
        console.log(res);
        this.loginState = false;
        this.loginOutDialogShow = false;
        window.localStorage.removeItem("userId");
        // if(this.$router.name)
        // console.log(this.$route);
        if (this.$route.name != "Home") {
          this.$router.push({ name: "Home" });
        }
      });
    },
    async confirmLogin() {
      let { data } = await axios.post(
        "http://localhost:3000/api/session/login",
        this.loginData
      );
      if (data.code === 1) {
        // console.log("登陆失败");
        this.$message({ type: "error", message: "用户名或密码不正确" });
      } else {
        this.loginState = true;
        this.loginDialogShow = false;
        console.log(data.data.id);
        window.localStorage.setItem("userId", data.data.id);
        // console.log(window.localStorage.getItem("userId"));
        // alert("登录成功");
      }
    },
    loginClose() {
      (this.loginData.username = ""), (this.loginData.password = "");
    },
    registClose() {
      this.registData.username = "";
      this.registData.password = "";
      this.repassword = "";
      this.registData.email = "";
      this.loginDialogShow = true;
    },
    openRegist() {
      this.loginDialogShow = false;
      this.registDialogShow = true;
    },
    regist() {
      axios
        .post("http://localhost:3000/api/users/regist", this.registData)
        .then((res) => {
          console.log(res);
        });
      this.registDialogShow = false;
      // this.loginDialogShow = true;
    },
    addBlog() {
      if (this.loginState) {
        this.addDialogShow = true;
      } else {
        alert("请先登录");
      }
    },
  },
  components: { articleEditor },
};
</script>

<style scoped>
header {
  height: 100px;
  /* background-color: lightsteelblue; */
  line-height: 100px;
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid lightgray;
}
h1 {
  margin-left: 30px;
}
.nav {
  /* background-color: rgb(110, 135, 168); */
  margin-right: 30px;
}
.nav span {
  display: inline-block;
  width: 80px;
  height: 100%;
  text-align: center;
}
.nav span:hover {
  cursor: pointer;
}
.inputBox {
  display: block;
  margin-bottom: 5px;
}
.inputBox .label {
  display: inline-block;
  width: 70px;
  margin-right: 5px;
}
.inputBox .el-input {
  display: inline-block;
  width: 200px;
}
.dialog-footer .login {
  background-color: lightblue;
}
.dialog-footer .regist {
  background-color: lightcyan;
}
.dialog-footer .confirm {
  background-color: rgb(231, 210, 213);
}
</style>