<script type="text/x-template" lang="ts">

import NavigationBar from "@/components/NavigationBar.vue";
import {store} from "@/store";
// import login from "@/pages/Login.vue";

export default {

  name: 'Layout',
  computed: {
    isLoggedIn() {
      return store.isLoggedIn
    },
    username() {
      return store.user?.name || store.user?.username|| '未登录';
    },
    isAdmin() {
      return store.user?.role === 'admin';
    }
  },
  components: {NavigationBar},
}


</script>

<template>
  <div class="common-layout">

    <el-container>
      <div class="header">
      <el-header style="position: fixed; z-index: 1000; width: 100%;background-color: #fff;">
        <el-row>
          <el-col :span="6"><div class="logo"><img src="/public/慧医疗logo.png" alt="慧医疗logo"></div></el-col>
          <el-col :span="16"><NavigationBar/></el-col>
          <el-col :span="2">

            <div class="logining" @click="$router.push('/login')" v-if="!isLoggedIn">登录</div>
            <div class="setting"  v-if="isLoggedIn">
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item><router-link :to="`/personal`" style="text-decoration: none; color: #333; :hover{color: #409eff;}">用户信息</router-link></el-dropdown-item>
                  <el-dropdown-item divided v-if="isAdmin"><router-link :to="`/admin`" style="text-decoration: none; color: #333;">管理面板</router-link></el-dropdown-item>
                  <el-dropdown-item ><router-link :to="`/login`" style="text-decoration: none; color: #333; :hover{color: #409eff;}">退出登录</router-link></el-dropdown-item>
                </el-dropdown-menu>
              </template>
  </el-dropdown>
            </div>

          </el-col>
        </el-row>
      </el-header>
    </div>
      <el-main>
        <div class="content"></div>
        <router-view />
      </el-main>
      <el-footer>
        <div class="footer">慧医疗版权所有 © 2024</div>
      </el-footer>
    </el-container>
  </div>
</template>

<style scoped>
.common-layout {
  background-image: url("../assets/y-so-serious-white.png");

}
//background-image: url("../assets/trianglify-lowres.png");

.el-main{
  flex-grow: 1;
}

.logo img{
 width: 75px;
  height: 60px;
}

.logo{
  display: flex;
  align-items: center;
  margin-left: 20px;
}

.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}

.logining{
  display: flex;
  justify-content: center;
  transform: translateY(20px);
  color: #fff;
  background-color: #13a57c;
  border-radius: 10px;
  width: 80px;
  height: 25px;
  font-size: 16px;
}
span{
  display: flex;
  transform: translateY(22px);

}

.logining:hover{
  cursor: pointer;

}

.setting:hover{
  cursor: pointer;
}

.el-footer{
  bottom: 0;
  display: flex;
  background-color: rgb(213, 239, 239);
  width: 100%;
  height: 70px;
  text-align: center;
  justify-content: center;
  align-items: center;
  padding: 0;
}

.header{
  border-bottom: 1px solid rgb(19,165,124);
}
.footer{
  padding: 0;
}

.content{
  height: 50px;
}

</style>