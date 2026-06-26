<script lang="ts">
import LayoutMenuItem from "@/components/admin/LayoutMenuItem.vue";
import HeaderTool from "@/components/admin/HeaderTool.vue";

const mockData = [
  {
    name: 'Dashboard',
    title: '智慧首页',
    path:'/admin/dashboard',
    icon: 'House'
  },

      {
        name: 'Role',
        title: '角色管理',
        path:'/admin/role',
        icon:'Stamp',
        children: [
          {
            name:'User',
            title:'用户管理',
            path:'/admin/role/users',
            icon:'User'
          },
          {
            name:'Personnel',
            title:'人事管理',
            path:'/admin/role/personnel',
            icon:'Management'
          }],



  },
  {
    name: 'Dialog',
    title: '对话管理',
    path:'/admin/dialog',
    icon:'Reading',
    children: [
      {
        name:'Question',
        title:'用户问题',
        path:'/admin/dialog/question',
        icon:'List'
      },
      {
        name: 'Answer',
        title: '医师回答',
        path: '/admin/dialog/answer',
        icon: 'Checked'
      }
    ],

  },
  {
    name: 'Publish',
    title: '投稿文档',
    path:'/admin/publish',
    icon: 'DocumentAdd',
  },
  {
    name: 'Statistics',
    title: '数据统计',
    path:'/admin/statistics',
    icon: 'PieChart'
  },
];



export default {
  name: 'Layout',
  components: {HeaderTool, LayoutMenuItem},
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '2-1',
      menuData: mockData,
      openTabs:[]
    }
  },
  computed: {
    selectedItem() {
      return this.menuData.find(item => item.path === this.$route.path)
    },
    selectedTab() {
      let tab =this.openTabs.find(tab=>tab.name === this.$route.name)
      return !!tab? tab.name : ''
    }
  },
  methods: {
    handleOpen(key: string, keyPath: string[]) {
      console.log(key, keyPath)
    },
    handleClose(key: string, keyPath: string[]) {
      console.log(key, keyPath)
    },
    handleSelect(key: string) {
      console.log(key)
      this.activeIndex = key
    },
    handleTabRemove(pane: string) {

    },

    handleTabSelect(pane: any) {
    }
  }

}
</script>

<template>
  <div class="common-layout">
    <el-container style="background: #f0f2f5;height: 100vh;">
      <el-aside style="padding-right: 0;width: 200px;background: #13a57c;">
        <el-col :span="24" style="background: #13a57c;">

          <h4 class="mb-2" style=" text-align: center; height: 17px; line-height: 17px;background: #13a57c;color: white">慧医疗后台管理系统</h4>

          <el-menu
              active-text-color="#ffd04b"
              background-color="#545c64"
              class="el-menu-vertical-demo"
              default-active="1"
              text-color="#fff"
              @open="handleOpen"
              @close="handleClose"
              @select="handleSelect"
          >
            <layout-menu-item v-for="(item, index) in menuData" :key="index" :item="item" :index="index" :active-index="activeIndex"></layout-menu-item>
          </el-menu>
        </el-col>

      </el-aside>
      <el-container >
        <el-header style="padding:0;">
          <el-menu
              :default-active="activeIndex2"
              class="el-menu-demo"
              mode="horizontal"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b"
              @select="handleSelect"

          >

            <el-sub-menu index="2" >
              <template #title>慧医疗</template>
              <el-menu-item index="2-1" @click="$router.push('/home')"><router-link to="" style="text-decoration: none;color: #fff;">返回首页</router-link></el-menu-item>
              <el-menu-item index="2-2" @click="$router.push('/login')"><router-link to="" style="text-decoration: none;color: #fff;">退出登录</router-link></el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-header>
        <el-main>

          <HeaderTool></HeaderTool>
          <transition name="fade-scale">
            <keep-alive>
              <router-view />
            </keep-alive>
          </transition>
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>

<style >
.fade-scale-enter-active, .fade-scale-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.fade-scale-enter, .fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>