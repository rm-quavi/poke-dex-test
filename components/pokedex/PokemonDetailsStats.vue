<template lang="pug">
  .pokemon-detail-stats
    .flex-item(
      v-for="item in getPokemon.stats"
      :key="item.stat.name"
    )
      v-card.details-card
        h1.base-stat {{ item.base_stat }}
        p.mb-0 {{ item.stat.name }}

</template>
<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex';
export default Vue.extend({
  computed: {
    ...mapGetters('pokemon',['getPokemon'])
  }
})
</script>
<style lang="scss">
.pokemon-detail-stats {
  display: flex;
  flex-wrap: wrap;
  margin: 12px -4px 0;

  .flex-item {
    padding: 0 4px 12px;
    flex: 33.33%;
    max-width: 33.33%;

    .base-stat {
      font-size: 32px;
    }

    .details-card {
      height: 100%;
      text-transform: capitalize;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;

      p {
        font-size: 18px;
        line-height: 100%;
      }
    }
  }
}

@media screen and (min-width: 768px) {
  .pokemon-detail-stats {
    margin: 0 -4px;
  }
}

@media screen and (min-width: 960px) {
  .pokemon-detail-stats {
    .flex-item {
      flex: 1;
      max-width: none;
    }
  }
}
</style>