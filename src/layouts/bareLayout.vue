<template>
  <Router :include="keepAliveComponents" />
</template>

<script>
import KeepAliveComponents from 'assets/js/KeepAliveComponents'
import Router from 'src/router/Router'
export default {
  components: { Router },
  created () {
    this.$store.commit('AppLayout/updateLayoutLeftDrawer', false)
  },
  mounted () {
    this.$store.commit('AppLayout/updateVisibilityBreadcrumb', false)
  },
  data () {
    return {
      keepAliveComponents: KeepAliveComponents
    }
  }
}
</script>
