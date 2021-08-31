<template lang="pug">
  .pokemon-list-item(@click="openPokemon()")
    .img-container
      v-img.pokemon-list-item-img(
        :src="imgUrl"
        :aspect-ratio="1" 
        @error="isImgError = true"
        lazy-src="pokeball-150x150.png" 
        transition="scale-transition"
      )
    p.pokemon-list-item-name {{ pokemon.name }}
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: ['pokemon'],
  data() {
    return {
      isImgError: false
    }
  },
  computed: {
    imgUrl() {
      if (this.isImgError) return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.pokemon.id}.png`
      else return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.pokemon.id}.png`
    }
  },
  methods: {
    openPokemon() {
      this.$router.push(`/pokemons/${this.pokemon.id}`)
    }
  },
})
</script>
<style lang="scss">
.pokemon-list-item {
  transition: all .3s ease;
  cursor: pointer;
  padding: 8px;

  &:nth-child(odd) {
    .pokemon-list-item-img {
      // animation-delay: 1s;
    }
  }

  .img-container {
    padding: 8px;

    .pokemon-list-item-img {
      top: 0;
      position: relative;
      animation: animatePokemon 2.5s infinite;
      transition: all .3s ease;

      &:hover {
        transform: scale(1.08);
      }
    }
  }

  .pokemon-list-item-name {
    padding: 0 4px 4px;
    font-size: 18px;
    line-height: 100%;
    text-transform: capitalize;
    text-align: center;
    margin: 0;
    color: black;
    text-shadow: 1px 1px rgb(187, 187, 187);
  }
}

@media screen and (min-width: 960px) {
  .pokemon-list-item {
    padding-bottom: 16px;

    .pokemon-list-item-name {
      font-size: 24px;
    }
  }
}

@keyframes animatePokemon {
  0% { top: 0; }
  50% { top: 5px; }
  100% { top: 0; }
}
</style>