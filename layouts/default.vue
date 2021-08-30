<template lang="pug">
  v-app
    TheAppbar
    v-main
      nuxt
</template>
<script lang="ts">
import Vue from 'vue'
import TheAppbar from '~/components/TheAppbar.vue'
export default Vue.extend({
  components: { TheAppbar }
})
</script>
<style lang="scss">

</style>
