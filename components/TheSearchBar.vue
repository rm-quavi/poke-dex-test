<template lang="pug">
  v-autocomplete.main-search-bar.v-dense(
    :items="getAllPokemons"
    @input.native="onType"
    v-model="search"
    :search-input.sync="searchInput"
    :no-data-text="searchMessage"
    :loading="isSearching"
    item-text="name"
    item-value="id"
    solo
    dense
    append-icon="mdi-magnify"
    placeholder="Search a pokemon.."
    clearable
    ref="searchInputRef"
  )
</template>
<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex';
export default Vue.extend({
  data() {
    return {
      search: '',
      searchMessage: 'Search a pokemon..',
      isSearching: false,
      searchInput: null
    }
  },
  computed: {
    ...mapGetters('pokemon',['getAllPokemons'])
  },
  methods: {
    onType(event: any) {
      if (this.isSearching) return
      this.searchMessage = 'Search a pokemon..'
      this.isSearching = true

      if (this.getAllPokemons.length == 0) {
        this.$store.dispatch('pokemon/fetchAllPokemons')
      }

      this.isSearching = false
    },
  },
  watch: {
    search(newVal) {
      console.log(newVal)
      if (!newVal) return
      this.$nextTick(() => {
        this.$refs.searchInputRef.$el.querySelector("input").blur()
        this.$refs.searchInputRef.$el.querySelector("input").value = null
        this.searchInput = null
        this.search = null
      })
      this.$router.push(`/pokemons/${newVal}`)
    }
  }
})
</script>
<style lang="scss">
.main-search-bar {
  max-width: 250px;

  .v-input__slot {
    box-shadow: none !important;
    background: $c-primary !important;
    color: black !important;

    input {
      letter-spacing: 0.8px;
    }

    .v-icon {
      transform: none !important;
    }
  }
}
</style>