<script type="text/javascript" lang="ts">

const menus = [
  {
    name: 'home',
    title: '首页',
    path: '/home',
    icon: 'el-icon-s-home'
  },
  {
    name: 'choice',
    title: '医师选择',
    path: '/choice',
    icon: 'el-icon-s-tools'
  },
  {
    name: 'contact',
    title: '线上咨询',
    path: '/contact',
    icon: 'el-icon-s-help'
  },
  {
    name: 'fitness',
    title: '健身方案',
    path: '/fitness',
    icon: 'el-icon-s-data'
  },
  {
    name: 'psychology',
    title: '健康心理',
    path: '/psychology',
    icon: 'el-icon-s-opportunity'
  }
];

export default {
  name: 'navigationbar',
  data() {
    return {
      // selected: 'home'
      menus: menus
    }
  },
  computed: {
    selected() {
      // console.log(this.$route)
      return this.$route.path;
    }
  },
  methods: {
    // 定义函数，根据路由的path来设置导航栏的选中样式
    selectedClass(value:string) {
      if (this.selected.includes( value)) {
        return 'navb-active'
      } else {
        return ''
      }
    }
  }
}


</script>

<template>
  <div class="nav" >
    <div v-for="menu in menus" :key="menu.name" :class="selectedClass(menu.name)" id="nav-item">
      <el-link :underline="false" >
        <router-link :to="menu.path">{{ menu.title }}</router-link>
      </el-link>
    </div>
  </div>

</template>

<style scoped>
#nav-item {
  display: flex;
  align-items: center;
  height: 30px;
}
.nav {

  display: flex;
  gap: 50px;
  align-items: center;
  height: 60px;
  background-color: #fff;
   }

  .el-link {
    margin-left: 20px;
    margin-right: 20px;
    font-size: 18px;
    font-weight: bold;

  }

  .el-link .el-icon--right.el-icon {
    vertical-align: text-bottom;
  }

  .el-link a {
    text-decoration: none!important;
    color: #333;
  }

    .navb-active {
      font-color: rgb(19,165,124);
      text-decoration: none;
      border-radius: 12px;
      border: 2px solid rgb(19,165,124);
    }



</style>