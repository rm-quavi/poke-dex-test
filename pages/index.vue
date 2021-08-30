<template lang="pug">
  section.section.poke-dex-home
    TheLoadingPage(v-if="getPokemons.length == 0")
    .pokemons-container(v-if="getPokemons.length > 0")
      ListItemPokemon(
        v-for="pokemon in getPokemons"
        :key="pokemon.id"
        :pokemon="pokemon"
      )
    .pagination-container.px-5
      v-pagination.mt-4.mt-md-2(
        v-model="pagination"
        :length="paginationLength"
        total-visible="6"
      )
    
</template>
<script lang="ts">
import Vue from 'vue'
import ListItemPokemon from '~/components/pokedex/ListItemPokemon.vue'
import { mapGetters } from 'vuex';
import TheLoadingPage from '~/components/TheLoadingPage.vue';
export default Vue.extend({
  components: { ListItemPokemon, TheLoadingPage },
  data() {
    return {
      pokemons: [],
      pagination: 0
    }
  },
  computed: {
    ...mapGetters('pokemon',['getPokemons','getTotalPokemons']),
    paginationLength() {
      let length = this.getTotalPokemons / 32
      return Math.ceil(length)
    }
  },
  async mounted () {
    this.pagination = this.$route.query.page ? parseInt(this.$route.query.page) : 1
    // await this.$store.dispatch('pokemon/fetchPokemons', page)
  },
  watch: {
    async pagination(newValue, oldValue) {
      // scroll to top
      window.scrollTo({top: 0, behavior: 'smooth'});
      // Set page query
      if (newValue != 1) {
        let query = this.$route.query
        this.$router.push({name: this.$route.name, query: {...query, page: newValue}})
      } else if (oldValue != 0){
        this.$router.replace({})
      }
      await this.$store.dispatch('pokemon/fetchPokemons', newValue)
    }
  }
})
</script>
<style lang="scss">
.poke-dex-home {
  padding: 12px;

  .pokemons-container {
    background: url('../assets/images/background/grass-bg.jpg');
    border: 4px solid $c-primary;
    border-radius: 12px;
    display: grid;
    grid-template-columns: repeat(auto-fill, 105px);
    justify-content: center;
    // grid-auto-flow: row;
  }

  .pokedex-list-col {
    padding: 8px;
  }
}

@media screen and (min-width: 960px) {
  .poke-dex-home {
    padding: 20px;

    .pokemons-container {
      grid-template-columns: repeat(auto-fill, 140px);
    }

    .pokedex-list-col {
      padding: 12px;
    }
  }
}
</style>
