<template lang="pug">
  v-dialog(
    v-model="dialog"
    max-width="400"
    content-class="pokemon-details-dialog"
  )
    v-card.details-card
      v-btn.close-details-dialog(
        @click="dialog = false"
        icon
        color="dark"
      )
        v-icon mdi-close
      h3.details-dialog-title {{ name }}
      ul.details-dialog-list(v-if="details.length > 0")
        li(
          v-for="detail in details"
          :key="detail"
        ) {{ detail }}
      v-progress-circular.d-block.mx-auto.mb-2(
        indeterminate
        color="dark"
        v-else
      )
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: ['dialogProps', 'name', 'details'],
  computed: {
    dialog: {
      get: function() {
        return this.dialogProps
      },
      set: function(val) {
        this.$emit('onDialogChange', val)
      }
    }
  },
})
</script>
<style lang="scss">
.pokemon-details-dialog {
  border-radius: 12px;
  .v-card {
    position: relative;

    .details-dialog-title {
      text-transform: capitalize;
      padding-bottom: 8px;
    }

    .close-details-dialog {
      position: absolute;
      top: 8px;
      right: 8px;
    }
  }
}
</style>