<template lang="pug">
  v-app 
    v-main
      .error-page
        img(src="/images/pokeball-small.png")
        h1(v-if="error.statusCode === 404") {{ pageNotFound }}
        h1(v-else) {{ otherError }}
        NuxtLink(to="/") Home
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped lang="scss">
.error-page {
  min-height: calc(100vh - 150px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  img {
    width: 100px;
  }
}
</style>
