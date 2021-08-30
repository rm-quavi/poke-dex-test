<template lang="pug">
  v-card.pokemon-detail-heading.details-card
    v-img(
      :src="getPokemon.image"
      :aspect-ratio="1" 
    )
    h1.pokemon-detail-heading-name {{ getPokemon.name }}
    .details-container.mb-2.mt-4
      p.mb-0 Weight: 
      v-chip.detail-chip(
        small
        color="primary"
      ) {{ getPokemon.weight }} kg

    .details-container.mb-2
      p.mb-0 Types: 
      v-chip.detail-chip(
        v-for="type in getPokemon.types"
        :key="type.name"
        small
        :color="getType(type.name).color"
      ) 
        span {{ type.name }}

    .details-container.mb-2
      p.mb-0 Abilities: 
      v-chip.detail-chip(
        v-for="ability in getPokemon.abilities"
        :key="ability.name"
        small
        color="primary"
        @click="openAbility(ability)"
      ) 
        span {{ ability.name }}
        v-icon.pl-1(style="font-size: 18px") mdi-chevron-right
    
    .details-container(v-if="getPokemon.evolutions.length != 0")
      p.mb-0 Evolution:
      v-chip.detail-chip(
        v-for="evolution in getPokemon.evolutions"
        :key="evolution.name"
        small
        color="primary"
        :href="getPokemonUrl(evolution.url)"
        target="_blank"
      ) 
        span {{ evolution.name }}
        v-icon.pl-1 mdi-open-in-new

    //- Ability Dialog
    DialogPokemonDetails(
      :dialogProps="abilityDialog"
      :name="selectedAbility.name"
      :details="selectedAbilityEffects"
      @onDialogChange="abilityDialog = $event"
    )
</template>
<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex';
import Types from '@/data/constants/Types'
import DialogPokemonDetails from '@/components/pokedex/DialogPokemonDetails.vue'
export default Vue.extend({
  components: { DialogPokemonDetails },
  data() {
    return {
      abilityDialog: false,
      selectedAbility: {},
      selectedAbilityEffects: []
    }
  },
  computed: {
    ...mapGetters('pokemon',['getPokemon'])
  },
  methods: {
    getType(name) {
      return Types[Types.findIndex(t => t.name == name)]
    },
    getPokemonUrl(pokemonUrl) {
      let url = pokemonUrl.slice(1, -1)
      let splitUrl = url.split("/")
      return `${window.location.origin}/pokemons/${splitUrl[splitUrl.length - 1]}`
    },
    openAbility(ability) {
      this.selectedAbility = ability
      this.abilityDialog = true
    }
  },
  watch: {
    async selectedAbility(newVal) {
      this.selectedAbilityEffects = []
      let response = await this.$axios.get(newVal.url)
      response.data.effect_entries.forEach(entry => {
        if (
          !this.selectedAbilityEffects.includes(entry.short_effect) &&
          entry.language.name == "en"
        ) {
          this.selectedAbilityEffects.splice(this.selectedAbilityEffects.length - 1, 0 ,entry.short_effect)
        }
      })
    }
  }
})
</script>
<style lang="scss">
.pokemon-detail-heading {
  max-width: 100%;
  flex: 100%;

  .v-image {
    max-width: 200px;
    display: block;
    margin: 0 auto;
  }

  .pokemon-detail-heading-name {
    text-transform: capitalize;
    text-align: center;
    font-size: 28px;
    margin-top: 8px;
  }
}

@media screen and (min-width: 768px) {
  .pokemon-detail-heading {
    width: 250px;
    max-width: 250px;
    flex: auto;
  }
}
</style>