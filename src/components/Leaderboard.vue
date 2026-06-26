<script lang="ts">
import {UserFilled} from '@element-plus/icons-vue'

const mockData = [
  {
    id: 1,
    name: '张大',
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',

  },
  {
    id: 2,
    name: '王二',
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',

  },
  {
    id: 3,
    name: '李三',
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',

  },
  {
    id: 4,
    name: '赵四',
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',

  },
]
export default {
  name: 'leaderboard',
  data() {
    return {
      data: mockData
    }
  },
  // methods: {
  //   generateDetailUrl(id: number) {
  //     return `/choice/detail/${id}`;
  //   }
  // }
}
</script>

<template>
  <div class="leaderboard">

    <el-card style="width: 480px" shadow="always">
      <el-icon>
        <List/>
      </el-icon>
      科普医师排行榜
    </el-card>
    <el-card style="width: 480px" shadow="hover" v-for="(item, index) in data" :key="item.id">
      <div class="avatar-wrapper">
        <el-avatar :src="item.avatar"/>
      </div>
      <div class="name-wrapper">
        <router-link :to="`/choice/detail/${item.id}`" style="text-decoration: none; color: #333">{{ item.name }}
        </router-link>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.leaderboard {
  margin: 15px 55px 50px 0;
}

.el-card .avatar-wrapper {
  display: inline-block;
}

.el-card .name-wrapper {
  display: inline-block;
  transform: translateY(-12px);
  margin-left: 10px;
  font-size: 18px;
}
</style>