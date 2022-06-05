<template>
  <q-card class="item-box"
          @click="goToContentPage">
    <q-card-section>
      <p class="title-box"
         v-html="content.summary" />
      <p class="creation-time-box">
        {{content.shamsiDate('creation_time').dateTime}}
      </p>
    </q-card-section>
  </q-card>
</template>

<script>
import { Content } from 'src/models/Content'

export default {
  name: 'ContentItem',
  props: {
    data: {
      type: Content,
      default: new Content()
    }
  },
  data: () => ({
    content: new Content()
  }),
  mounted () {
    this.content = new Content(this.data)
  },
  methods: {
    goToContentPage () {
      this.$router.push({ name: 'UserPanel.Content', params: { content_id: this.content.id } })
    }
  }
}
</script>

<style lang="scss" scoped>
.item-box{
  cursor: pointer;
  width: 260px;
  border-radius: 20px;
  margin-bottom: 10px;
  .title-box{
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    height: 48px;
    letter-spacing: -0.03em;
    color: #333333;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
    margin: 0;
    //&::before{
    //  content: '.';
    //  font-size: 40px;
    //  line-height: 8px;
    //  color: #958fe2;
    //  padding-right: 10px;
    //}
  }
}
</style>
