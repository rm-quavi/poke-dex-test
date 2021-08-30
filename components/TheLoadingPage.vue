<template lang="pug">
  .loading-page
    img.loading-img(
      src="/images/pokeball-small.png"
    )
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({

})
</script>
<style lang="scss">
.loading-page {
  min-height: calc(100vh - 120px);
  display: flex;
  align-items: center;
  justify-content: center;

  .loading-img {
    position: relative;
    top: 0;
    animation: pokeballAnimation 3s ease infinite;
    width: 100px;
  }
}

@keyframes pokeballAnimation {
  0% { top: 0;}
  50% { top: 12px;}
  100% { top: 0;}
}
</style>