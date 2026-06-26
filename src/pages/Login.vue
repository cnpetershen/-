<template>
  <div id="poster" style="background: #8edcaa">
    <el-form class="login-container" label-position="left"  label-width="0px" style="background-color: rgba(255, 255, 255, 0.5); ">
      <h3 class="login_title">
        欢迎登陆
        <el-button   @click="toRegister()">点我注册</el-button>
      </h3>
      <el-form-item label="">
        <el-input  type="text" v-model="username" autocomplete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input type="password" v-model="password" autocomplete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;background:#3fb280;border:none" v-on:click="isLoggedIn()">登陆</el-button>

      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {store} from "@/store";

export default {
  name: 'login',
  data() {
    return {

      username: '',
      password: '',

    }
  },
  methods: {
    isLoggedIn() {
      this.axios.post('/api/user/login', {
        username: this.username,
        password: this.password
      }).then((resp) => {
        let data = resp.data;
        if (data.isLoggedIn) {
          store.username = data.username;
          store.isLoggedIn = true;
          store.token = data.token;
          store.role = data.role;

          store.user=data;
          this.$router.push('/home');
        } else {
          this.$message.error('Invalid credentials');
        }
      }).catch((error) => {
        this.$message.error('An error occurred');
      });
      // return store.isLoggedIn=true;
    },
    toRegister(){
      this.$router.push({path:'/Register'})
    }
  },



}
</script>

<style>
#poster{
  background-position:center;
  height:100%;
  width:100%;
  background-size:cover;
  position:fixed;
}
body{
  margin:0px;
  padding:0px;
}
.login-container{
  border-radius:15px;
  background-clip:padding-box;
  margin:90px auto;
  width:350px;
  padding: 35px 35px 15px 35px;
  background:#fff;
  border:1px solid #eaeaea;
  box-shadow:0 0 25px #cac6c6;
}
.login_title{
  margin : 0px auto 40px auto;
  text-align:center;
  color:#505458;
}
</style>