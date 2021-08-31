<template lang="pug">
  v-card.details-card.pokemon-details-damage-card
    h2.damage-card-title {{ type }}
    .damage-relation-container.mt-2(
      v-for="key in Object.keys(filterDamages)"
      :key="key"
    )
      h4.damage-card-title {{ getDamageTitle(key) }}
      v-chip.detail-chip(
        v-for="type in filterDamages[key]"
        :key="type.name"
        small
        :color="getType(type.name).color"
      ) 
        span {{ type.name }}
      
      //- Add chip if no items
      v-chip.detail-chip(
        small
        color="primary"
        v-if="filterDamages[key].length == 0"
      ) 
        span None
      
</template>
<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex';
import Types from '@/data/constants/Types';

export default Vue.extend({
  props: ['type'],
  computed: {
    ...mapGetters('pokemon',['getPokemon']),
    filterDamages() {
      if (this.type == 'strengths') {
        return {
          double_damage_to: this.getPokemon.damageRelations['double_damage_to'],
          half_damage_from: this.getPokemon.damageRelations['half_damage_from']
        }
      } else {
        return {
          double_damage_from: this.getPokemon.damageRelations['double_damage_from'],
          half_damage_to: this.getPokemon.damageRelations['half_damage_to']
        }
      }
    }
  },
  methods: {
    getType(name) {
      return Types[Types.findIndex(t => t.name == name)]
    },
    getDamageTitle(text) {
      return text.replace(/_/g,' ')
    }
  }
})
</script>
<style lang="scss">
.pokemon-details-damage-card {
  height: 100%;
  
  .damage-card-title {
    text-transform: capitalize;
  }
}
</style>