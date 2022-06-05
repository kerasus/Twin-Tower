<template>
  <page-builder :sections="sections" />
</template>

<script>
import API_ADDRESS from 'src/api/Addresses'
import PageBuilder from 'components/PageBuilder/PageBuilder'
import { ContentList } from 'src/models/Content'

export default {
  name: 'PageIndex',
  components: {
    PageBuilder
  },
  created () {
    this.getContents()
  },
  data () {
    return {
      contents: new ContentList(),
      sections: [
        {
          data: {
            rows: [
              {
                cols: [
                  {
                    widgets: [
                      {
                        name: 'content-list',
                        data: new ContentList()
                      }
                    ]
                  }
                ]
              }
            ]
          }
        }
      ]
    }
  },
  methods: {
    loadContents () {
      this.sections[0].data.rows[0].cols[0].widgets[0].data = this.contents
    },
    getContents () {
      this.contents.loading = true
      this.$axios.get(API_ADDRESS.content.base)
        .then(response => {
          this.contents = new ContentList(response.data.results)
          this.contents.loading = true
          this.loadContents()
        })
        .catch(() => {
          this.contents.loading = true
        })
    }
  }
}
</script>
