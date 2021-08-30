<template lang="pug">
  v-card.details-card.pokemon-details-moves(v-if="getPokemon.moves.length > 0")
    h3.move-card-title.mb-2 Moves
    v-chip.detail-chip(
      v-for="item in getPokemon.moves"
      :key="item.move.name"
      small
      color="primary"
      @click="openMove(item.move)"
    ) 
      span {{ item.move.name }}
      v-icon.pl-1(style="font-size: 18px") mdi-chevron-right

    //- Move Dialog
    DialogPokemonDetails(
      :dialogProps="moveDialog"
      :name="selectedMove.name"
      :details="selectedMoveEffects"
      @onDialogChange="moveDialog = $event"
    )
</template>
<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex';
import DialogPokemonDetails from './DialogPokemonDetails.vue';


export default Vue.extend({
  components: { DialogPokemonDetails },
  data() {
    return {
      moveDialog: false,
      selectedMove: {},
      selectedMoveEffects: []
    }
  },
  computed: {
    ...mapGetters('pokemon',['getPokemon']),
  },
  watch: {
    async selectedMove(newVal) {
      this.selectedMoveEffects = []
      let response = await this.$axios.get(newVal.url)
      console.log(response.data)
      response.data.effect_entries.forEach(entry => {
        if (
          !this.selectedMoveEffects.includes(entry.short_effect) &&
          entry.language.name == "en"
        ) {
          this.selectedMoveEffects.splice(this.selectedMoveEffects.length - 1, 0 ,entry.short_effect)
        }
      })
    }
  },
  methods: {
    openMove(move) {
      this.selectedMove = move
      this.moveDialog = true
    }
  }
})
</script>
<style lang="scss">
.pokemon-details-moves {
  margin: 12px 0;
}
</style>