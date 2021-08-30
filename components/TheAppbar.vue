<template lang="pug">
  v-app-bar.main-app-bar(
    color="dark"
    fixed
    app
    flat
    dark
  )
    v-toolbar-title(@click="$router.push('/')")
      img(
        src="/images/pokeball-small.png" 
      )
      p.mb-0(v-if="$vuetify.breakpoint.mdAndUp") Pokedex
    v-spacer
    TheSearchBar
</template>
<script lang="ts">
import Vue from 'vue'
import TheSearchBar from './TheSearchBar.vue'

export default Vue.extend({
  components: { TheSearchBar }
})
</script>
<style lang="scss">
.main-app-bar {
  .v-toolbar__content {
    border-bottom: 4px solid $c-primary !important;
  }

  .v-toolbar__title {
    cursor: pointer;
    display: flex;
    align-items: center;

    img {
      width: 28px;
      margin-right: 8px;
    }
  }
}
</style>
