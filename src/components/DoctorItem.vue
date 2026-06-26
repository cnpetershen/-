<script lang="ts">
import {ref} from 'vue'


const activeName = ref('1')
export default {
  name: 'DoctorItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
}

</script>

<template>
  <div>
    <el-descriptions
        direction="vertical"
        border
        style="margin-top: 20px"
    >
      <el-descriptions-item
          :rowspan="2"
        :width="140"
        label="Photo"
        align="center">

        <el-image
            style="width: 100px; height: 100px"
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        />
      </el-descriptions-item>
      <el-descriptions-item label="Name">
        <router-link :to="`/choice/detail/${item.id}`" style="text-decoration: none; color: #333">
          {{ item.name }}
        </router-link>
      </el-descriptions-item>
      <el-descriptions-item label="Telephone">
        {{ item.telephone }}

      </el-descriptions-item>
      <el-descriptions-item label="Granduate">
        {{ item.granduate }}
      </el-descriptions-item>
      <el-descriptions-item label="职称">
        <el-tag size="small">
          {{ item.title }}
        </el-tag>
      </el-descriptions-item>

      <el-descriptions-item label="专业特长">
        {{ item.specialty }}

        <slot name="question" :item="item">
<!--          <button class="question" @click="onShowQuestion(item)">-->
<!--              向他提问-->
<!--            </button>-->

        </slot>
        <!-- **slot** 插槽-->
      </el-descriptions-item>

    </el-descriptions>
    <div class="demo-collapse" >
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item title="学术成就" name="1" >
          <div >
            {{item.achievements}}
          </div>

        </el-collapse-item>
        <el-collapse-item title="学术交流" name="2">
          <div>
            {{item.communication}}
          </div>
        </el-collapse-item>
        <el-collapse-item title="荣誉奖项" name="3">
          <div>
          {{item.award}}
          </div>


        </el-collapse-item>
        <el-collapse-item title="工作经历" name="4">
          <div>
            {{item.experience}}
          </div>

        </el-collapse-item>
      </el-collapse>
    </div>

  </div>
</template>

<style scoped>
.question{
  background-color: #13a57c;
  border-radius: 20px;
  border: none;
  color: white;
  padding: 5px 10px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;


}

</style>