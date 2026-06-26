<script  lang="js">
import Contact from  '@/pages/Contact.vue';

  export default {
    name: 'DoctorQDialog',
    props: {
      visible: {
        type: Boolean,
        default: true
      },
      doctor: {
        type: Object,
        default: () => ({})
      },
      onClose: {
        type: Function,
        default: () => {}
      }
    },
    components: {
      Contact
    },
  }
</script>

<template>
  <el-dialog :visible="visible" >
    <Contact  />
  </el-dialog>




</template>

<style scoped>

</style>