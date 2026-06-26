<script lang="ts">
import axios from 'axios';

import Leaderboard from "@/components/Leaderboard.vue";

export default {
  name: 'science',
  components: {Leaderboard},
  data() {
    return {
      scienceData: []
    };
  },
  created() {
    this.fetchScienceData();
  },
  methods: {
    fetchScienceData() {
      axios.get('/api/science/articles')
          .then(response => {
            this.scienceData = response.data;
          })
          .catch(error => {
            console.error('There was an error fetching the data!', error);
          });
    }
  }
}
</script>

<template>

  <div class="science">
    <div class="pages">
      <ul>
        <li v-for="item in scienceData" :key="item.href">
          <el-link :href="`/psychology/article/${item.id}`" >
            <div class="page">{{ item.title }}</div>
          </el-link>
        </li>
      </ul>
    </div>
    <div class="expert-leaderboard">
      <Leaderboard/>
    </div>
  </div>
</template>

<style scoped>


.science {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pages {
  display: inline-block;
  transform: translateY(-110px);
}

.page {
  font-size: 19px;
}

.expert-leaderboard {
  display: inline-block;
  margin-top: 20px;
}

.el-link {
  font-size: 18px;

}

ul {
  margin: 115px 0px 0px 80px;
}

li {
  list-style: none;
  height: 65px;
}
</style>