<template lang="pug">
  section.section.pokemon-details-page
    TheLoadingPage(v-if="!getPokemon.name")
    .pokemon-details-container(v-if="getPokemon.name")
      .details-left-col
        PokemonDetailsHeading
      .details-right-col
        PokemonDetailsStats

        .pokemon-damage-container
          .damage-card-wrapper
            PokemonDetailsDamageCard(type="strengths")
          .damage-card-wrapper
            PokemonDetailsDamageCard(type="weaknesses")
        
        PokemonDetailsMoves
</template>
<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import PokemonDetailsDamageCard from '~/components/pokedex/PokemonDetailsDamageCard.vue'
import PokemonDetailsHeading from '~/components/pokedex/PokemonDetailsHeading.vue'
import PokemonDetailsMoves from '~/components/pokedex/PokemonDetailsMoves.vue'
import PokemonDetailsStats from '~/components/pokedex/PokemonDetailsStats.vue'
import TheLoadingPage from '~/components/TheLoadingPage.vue'

export default Vue.extend({
  components: { 
    PokemonDetailsHeading, 
    PokemonDetailsStats, 
    PokemonDetailsDamageCard,
    PokemonDetailsMoves,
    TheLoadingPage
  },
  computed: {
    ...mapGetters('pokemon',['getPokemon'])
  },
  mounted() {
    const id = this.$route.params.id
    if (!id) {
      this.$router.push("/error")
      return
    }
    this.$store.dispatch('pokemon/fetchPokemon', id)
  },
  beforeDestroy() {
    this.$store.commit('pokemon/clearPokemon')
  },
})
</script>
<style lang="scss">
.pokemon-details-page {
  padding: 12px;

  .pokemon-details-container {
    display: flex;
    flex-wrap: wrap;
  }

  .details-left-col {
    width: 100%;
  }

  .details-right-col {
    flex: 100%;
    max-width: 100%;

    .pokemon-damage-container {
      & > :last-child {
        margin-top: 12px;
      }
    }
  }
}

@media screen and (min-width: 768px) {
  .pokemon-details-page {
    padding: 20px;

    .details-left-col {
      width: auto;
    }

    .details-right-col {
      flex: 1;
      max-width: none;
      padding-left: 20px;

      .pokemon-damage-container {
        display: flex;
        margin: 0 -4px;

        & > * {
          flex: 50%;
          width: 50%;
          padding: 0 4px;
          margin-top: 0 !important;
        }
      }
    }
  }
}
</style>