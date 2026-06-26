<script lang="ts">
export default {
  name: 'page',
  data() {
    return {
      message: 'Hello World'
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    }
  }
}
</script>

<template>
  <div>page id:{{ id }}</div>
</template>

<style scoped>

</style>