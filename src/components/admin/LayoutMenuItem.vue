<script  lang="ts">
  export default {
    name: 'LayoutMenuItem',
    props: {
      item: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        currentIcon: null
      }
    },
    methods: {
      setCurrentIcon() {
        if(!!this.item.icon)
        import(`@element-plus/icons-vue`).then(module => this.currentIcon = module[this.item.icon])
    }

    },
  mounted() {
    this.setCurrentIcon();
    }

  }
</script>

<template>
  <el-menu-item v-if="!!item&& (!item.children||item.children.length==0)" :index="item.name">
                  <template #title>
<!--                    <el-icon><icon-menu /></el-icon>-->
<!--                    <el-icon :name="item.icon" v-if="item.icon"></el-icon>-->
                    <el-icon v-if="item.icon">
                      <component :is="currentIcon"></component>
                    </el-icon>
                    <span><router-link :to="item.path" style="color: #fff;font-size: 14px;text-decoration: none;">{{ item.title }}</router-link></span>
                  </template>

    </el-menu-item>
    <el-sub-menu  v-else :index="item.name" v-show="!!item&&item.children&&item.children.length">
      <template #title>
        <el-icon v-if="item.icon">
          <component :is="currentIcon"></component>
        </el-icon>
        <router-link :to="item.path" style="color: #fff;font-size: 14px;text-decoration: none;">{{ item.title }}</router-link>
      </template>
      <LayoutMenuItem :item="child" v-for="child in item.children" :key="child.name"></LayoutMenuItem>
    </el-sub-menu>

</template>

<style scoped>

</style>