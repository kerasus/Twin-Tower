<template>
  <div class="block-section q-mx-md">
    <div class="block-header row justify-between q-pa-md q-mb-sm bg-white">
      <div class="row items-center block-title">
        <div class="row items-center">
          <q-badge rounded
                   class="q-mr-sm"
                   color="primary" />
        </div>
        <p class="title-box">
          آخرین آخبار
        </p>

      </div>
      <q-btn
        round
        color="primary"
        :icon="isGridView ? 'grid_view':'sync_alt'"
        @click="isGridView = !isGridView"
      >
      </q-btn>
    </div>
    <div class="block-container"
    >
      <div v-if="data.list.length > 0"
           class="item-container q-pb-md"
           :class="isGridView? 'row': 'scroll-view'"
      >
        <div v-for="content in this.data.list"
             :class="{'col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12':isGridView}"
             :key="content.id"
        >
          <content-item
            class="q-mr-md"
            :data="content"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ContentItem from 'components/Widgets/ContentItem/contentItem'
import { ContentList } from 'src/models/Content'

export default {
  name: 'Block',
  components: { ContentItem },
  data: () => ({
    isGridView: false
  }),
  props: {
    data: {
      type: ContentList,
      default: new ContentList()
    }
  },
  created () {
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.block-section{
  .block-header{
    border-radius: 10px;
    .block-title{
      .title-box{
        margin: 0;
        font-weight: 500;
        font-size: 18px;
        line-height: 24px;
        letter-spacing: -0.03em;
        color: #333333;
      }
    }
  }

  margin:30px;
  .block-container{
    .scroll-view{
      display: flex;
      width:100%;
      overflow: auto;
    }
    .item-container{
    }
}
}
</style>
