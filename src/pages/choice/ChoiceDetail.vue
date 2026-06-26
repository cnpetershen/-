<script lang="js">
import axios from 'axios';
import DoctorItem from "@/components/DoctorItem.vue";
import DoctorQDialog from "@/components/DoctorQDialog.vue";
export default {
  name: 'ChoiceDetail',
  components: {DoctorItem, DoctorQDialog},
  data() {
    return {
      detailData: {},
      currentDoctor: null,
    }
  },
  methods: {
    handleDoctorQ(doctorItem) {
      this.currentDoctor = doctorItem
    }
  },
  computed: {
    doctorId() {
      return this.$route.params.doctorId
    },
    doctorQDialogViable() {
      return this.currentDoctor!== null ;
    }

    },

  created() {
  },
  mounted() {
    axios.get(`/api/choice/detail/${this.doctorId}`).then(response => {
      this.detailData = response.data
    })
  }
}
</script>

<template>
  <div>
    <h1>Choice Detail</h1>
    <DoctorItem :item="detailData" @onShowQuestion="handleDoctorQ">
    <template v-slot:question="{item}">
      <el-button  @click="handleDoctorQ(item)" >
        向他提问
      </el-button>
    </template>
    </DoctorItem>
  <DoctorQDialog v-if="doctorQDialogViable" :doctor="currentDoctor" @close="currentDoctor = null">
    </DoctorQDialog>

  </div>
</template>

<style scoped>

</style>