<script lang="js">
export default {
  name: 'home',
  data() {
    return {
      bannerArr: []
    }

  },
  mounted() {
    this.axios.get("/api/banner/select").then( response=>{
      this.bannerArr = response.data;
    });
  }
}
</script>
<script setup lang="js">
import NavigationBar from '@/components/NavigationBar.vue';

import {ref} from 'vue';
import Science from "@/pages/Science.vue";
</script>

<template>
  <div class="home">

    <div class="ability-container">
      <h1>专家科普</h1>
      <p>EXPERT SCIENCE POPULARIZATION</p>
<!--      <el-carousel :interval="5000" arrow="always">-->
<!--        <el-carousel-item v-for="item in bannerArr">-->
<!--          <img :src="item.url" width="100%" height="100%" alt="">-->
<!--        </el-carousel-item>-->
<!--      </el-carousel>-->

      <el-carousel :interval="4000" type="card" height="250px">
        <el-carousel-item v-for="item in bannerArr">
          <img :src="item.url" width="100%" height="100%" alt="">
        </el-carousel-item>
      </el-carousel>
      </div>
  <science/>
    </div>



</template>



<style scoped>
.el-row {
  margin-bottom: 20px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.home {
  position: relative;
}

.online-contact-img {
  display: inline-block;
  margin-right: 20px;
}

.online-contact-img img {
  width: 200px;
  height: 150px;
}

.online-contact-content {
  position: absolute;
  display: inline-block;
  top: 150px;
}


.online-contact-container p {
  color: #989595;
}


.ability-container h1 {
  font-size: 36px;
  display: flex;
  justify-content: center;
}

.ability-container p {
  display: flex;
  justify-content: center;
  color: #989595;
  margin-top: 10px;
}

.demonstration {
  color: var(--el-text-color-secondary);
}

.el-carousel__item h3 {
  line-height: 300px;
  margin: 0;
  text-align: center;
}

</style>