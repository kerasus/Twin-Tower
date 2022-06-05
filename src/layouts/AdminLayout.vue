<template>
  <div class="q-pa-md">
    <Router :include="keepAliveComponents" />
  </div>
</template>

<script>
import Router from 'src/router/Router'
import KeepAliveComponents from 'assets/js/KeepAliveComponents'
export default {
  components: { Router },
  created () {
    this.$store.commit('AppLayout/updateLayoutLeftDrawer', true)
  },
  // mounted () {
  //   this.$store.commit('AppLayout/updateLayoutLeftDrawer', true)
  // },
  data () {
    return {
      keepAliveComponents: KeepAliveComponents
    }
  }
}
</script>
