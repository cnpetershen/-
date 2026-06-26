<script lang="js">
import PsychologyNav from "@/components/Psychology-nav.vue";

export default {
  name: 'psychology',
  components: {'psychology-nav': PsychologyNav}
}
</script>

<template>
  <div class="psychology">
<psychology-nav/>
      <router-view/>

  </div>
</template>

<style scoped>

</style>