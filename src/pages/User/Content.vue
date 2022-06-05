<template>
  <q-card class="q-ma-md">
    <q-card-section>
      <template v-if="content.loading">
        <q-skeleton type="text" />
      </template>
      <div v-else
           v-html="content.summary" />
    </q-card-section>
    <q-card-section>
      <template v-if="content.loading">
        <q-skeleton type="text" />
      </template>
      <div v-else
           v-html="content.text" />
    </q-card-section>
    <q-card-section>
      <template v-if="content.loading">
        <q-skeleton type="text" />
      </template>
      <template v-else>
        نوشته شده در:
        {{content.shamsiDate('creation_time').dateTime}}
      </template>
    </q-card-section>
  </q-card>
</template>

<script>
import { Content } from 'src/models/Content'
import API_ADDRESS from 'src/api/Addresses'

export default {
  name: 'Content',
  created () {
    this.getContent()
  },
  data () {
    return {
      content: new Content()
    }
  },
  methods: {
    getContent () {
      this.content.loading = true
      this.$axios.get(API_ADDRESS.content.base + '/' + this.$route.params.content_id)
        .then(response => {
          this.content = new Content(response.data)
          this.content.loading = false
        })
        .catch(() => {
          this.content.loading = false
        })
    }
  }
}
</script>

<style scoped>

</style>
