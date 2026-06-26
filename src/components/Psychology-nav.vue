<script lang="js">
const mockData = [
  {
    name: 'article',
    title: '最新热文',
    path: '/psychology/article'
  },
  {
    name: 'marriage',
    title: '婚恋情感',
    path: '/psychology/marriage'
  },
  {
    name: 'family',
    title: '家庭关系',
    path: '/psychology/family'
  },
  {
    name: 'social',
    title: '人际社交',
    path: '/psychology/social'
  },
  {
    name: 'self-awareness',
    title: '自我察觉',
    path: '/psychology/self-awareness'
  }
];


export default {
  name: 'Psychology-Nav',
  data() {
    return {
      items: mockData
    }
  },
  computed: {
    selected() {
      return this.$route.path;
    }
  },
  methods: {
    selectedClass(value) {
      if (value === this.selected) {
        return 'nav-active';
      } else {
        return '';
      }
    }
  }
}


</script>

<template>
  <div class="psychology-nav">
    <div v-for="(item, index) in items" :key="`psychology-nav-${item.name}`" :class="selectedClass(item.name)">
      <el-link :underline="false">
        <router-link :to="item.path" class="psychology-nav-link">{{ item.title }}</router-link>
      </el-link>
    </div>
  </div>
</template>

<style scoped>


.psychology-nav {
  display: flex;
  gap: 50px;
  align-items: center;
  height: 60px;

  .nav-active {
    font-color: rgb(19, 165, 124);
    text-decoration: none;
    border-radius: 12px;
    border: 2px solid rgb(19, 165, 124);
  }

  .el-link {
    margin-left: 20px;
    margin-right: 20px;
    font-size: 16px;
    font-weight: bold;

  }

  .el-link .el-icon--right.el-icon {
    vertical-align: text-bottom;
  }

  .el-link a {
    text-decoration: none !important;
    color: #333;
  }
}
</style>