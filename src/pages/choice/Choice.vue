<script lang="js">
import {ref} from 'vue'
import {Search} from '@element-plus/icons-vue'
import DoctorItem from "@/components/DoctorItem.vue";
import searchItem from "@/pages/choice/searchForm.vue"
import axios from "axios";


export default {
  data() {
    return {
      search: '',
      searchData: [],
      activeIndex: '1',

    };
  },
  components: {DoctorItem, searchItem},
  computed: {
  filterData() {
    return this.searchData.filter(item => {
      return item.name.includes(this.search) || item.department.includes(this.search) || item.specialty.includes(this.search);
    });
  }
  },



  mounted() {
    this.fetchDoctors();
  },
  methods: {
    handleSelect(event) {
      this.search = event;
    },
    handleRowClick(row) {
      location.href = "../Contact";
    },

    fetchDoctors() {
      axios.get('/api/choice/index')
          .then(res => {
            this.searchData = res.data;
          })
          .catch(error => {
            console.log(error);
          });

    }
  }
};
</script>



<template>
  <div class="choice">
    <div class="select">
      <div class="text-center">
        <h2>全体医师</h2>
          <el-menu
              ellipsis
              class="el-menu-popper-demo"
              mode="horizontal"
              :popper-offset="16"
              @select="handleSelect"
              style="width: 185px;height: 60px;text-align: center">
            <el-sub-menu index="1">
              <template #title class="as1">科室选择</template>
              <el-sub-menu index="内科">
                <template #title>内科</template>
                <el-menu-item index="神经内科">神经内科</el-menu-item>
                <el-menu-item index="消化内科">消化内科</el-menu-item>
                <el-menu-item index="呼吸内科">呼吸内科</el-menu-item>
                <el-menu-item index="内分泌科">内分泌科</el-menu-item>
                <el-menu-item index="肾内科">肾内科</el-menu-item>
              </el-sub-menu>
              <el-sub-menu index="外科">
                <template #title>外科</template>
                <el-menu-item index="肝胆外科">肝胆外科</el-menu-item>
                <el-menu-item index="泌尿外科">泌尿外科</el-menu-item>
                <el-menu-item index="整形外科">整形外科</el-menu-item>
              </el-sub-menu>
              <el-menu-item index="妇科">
                <template #title>妇科</template>
              </el-menu-item>
              <el-menu-item index="骨科">
                <template #title>骨科</template>
              </el-menu-item>
              <el-menu-item index="眼科">
                <template #title>眼科</template>
              </el-menu-item>
              <el-menu-item index="儿科">
                <template #title>儿科</template>
              </el-menu-item>
              <el-menu-item index="耳鼻喉科">
                <template #title>耳鼻喉科</template>
              </el-menu-item>
            </el-sub-menu>
          </el-menu>



        <el-table :data="filterData" @row-click="handleRowClick">
          <el-table-column prop="name" label="名称"></el-table-column>
          <el-table-column prop="department" label="科室"></el-table-column>
          <el-table-column prop="specialty" label="擅长"></el-table-column>
        </el-table>

      </div>
    </div>




        <div class="recommend">
          <DoctorItem :item="item" v-for="(item, index) in data" :key="index"/>
        </div>

  </div>

</template>

<style scoped>
.el-menu-popper-demo {
  display: flex;
  align-items: center;
  justify-content: center;
}

h2{
  font-size: 30px;
}

.input-with-select .el-input-group__prepend {
  background-color: var(--el-fill-color-blank);
}

input {
  width: 210px;
  height: 22px;
  padding: .4em;
}

.text-center {
  text-align: center;
}

.floating-label {
  width: 150px;
  margin: auto;
}


textarea,
select {
  margin-bottom: 2em;
  line-height: 1.15;
  font-size: 14px;
  padding: .4em;
  width: 100%;
}

.example .vfl-label {
  text-transform: uppercase;
}

.example .vfl-label-on-input {
  top: -1em;
}

.example .vfl-label-on-focus {
  color: #ff851b;
}

.example .vfl-label + input {
  padding-left: 0;
  font-size: 100%;
  border: 0;
  border-bottom: 2px solid #aaa;
  transition: border 0.2s;
}

.example .vfl-label-on-focus + input  {
  border-bottom: 2px solid #ff851b;
}

</style>