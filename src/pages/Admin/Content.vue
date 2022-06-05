<template>
  <entity-crud
    v-model:edit-inputs="editInputs"
    v-model:index-inputs="indexInputs"
    v-model:show-inputs="showInputs"
    v-model:create-inputs="createInputs"
    v-model:default-inputs="defaultInputs"
    v-bind="allProps"
  >
    <template v-slot:entity-crud-table-cell="{inputData, showConfirmRemoveDialog}">
      <q-td :props="inputData.props">
        <template v-if="inputData.props.col.name === 'actions'">
          <q-btn round
                 flat
                 dense
                 size="md"
                 color="info"
                 icon="info"
                 :to="{name:'Admin.Content.Show', params: {id: inputData.props.row.id}}">
            <q-tooltip>
              مشاهده
            </q-tooltip>
          </q-btn>
          <q-btn round
                 flat
                 dense
                 size="md"
                 color="negative"
                 icon="delete"
                 class="q-ml-md"
                 @click="showConfirmRemoveDialog(inputData.props.row, 'id', getRemoveMessage(inputData.props.row))">
            <q-tooltip>
              حذف
            </q-tooltip>
          </q-btn>
        </template>
        <template v-else-if="inputData.props.col.name === 'summary'">
          <div v-html="inputData.props.row.summary" />
        </template>
        <template v-else>
          {{ inputData.props.value }}
        </template>
      </q-td>
    </template>
  </entity-crud>
</template>

<script>
import API_ADDRESS from 'src/api/Addresses'
import { EntityCrud } from 'quasar-crud'

export default {
  name: 'Content',
  components: {
    EntityCrud
  },
  data () {
    return {
      model: null,
      tags: [],
      expanded: true,
      allProps: {
        config: {
          api: API_ADDRESS.content.base,
          title: {
            show: 'اطلاعات محتوا',
            edit: 'اطلاعات محتوا',
            create: 'ثبت محتوای جدید',
            index: 'لیست محتوا'
          },
          showRouteName: 'Admin.Content.Show',
          editRouteName: 'Admin.Content.Edit',
          indexRouteName: 'Admin.Content.Index',
          createRouteName: 'Admin.Content.Create',
          tableKeys: {
            data: 'results',
            total: 'count',
            currentPage: 'current',
            perPage: 'per_page',
            pageKey: 'page'
          },
          table: {
            columns: [
              {
                name: 'id',
                required: true,
                label: '#',
                align: 'left',
                field: row => row.id
              },
              {
                name: 'order',
                required: true,
                label: 'ترتیب',
                align: 'left',
                field: row => row.order
              },
              {
                name: 'summary',
                required: true,
                label: 'خلاصه',
                align: 'left',
                field: row => row.summary
              },
              {
                name: 'key',
                required: true,
                label: 'کلید',
                align: 'left',
                field: row => row.key
              },
              {
                name: 'actions',
                required: true,
                label: 'عملیات',
                align: 'left',
                field: ''
              }
            ],
            data: []
          }
        }
      },
      defaultInputs: [
        { type: 'hidden', name: 'key', responseKey: 'key', value: 'key1', label: 'key', col: 'col-md-12' },
        { type: 'input', name: 'id', responseKey: 'id', label: 'شناسه', col: 'col-md-3' },
        { type: 'select', name: 'type', responseKey: 'type', options: ['VIDEO', 'TEXT', 'SOUND'], value: null, label: 'نوع', col: 'col-md-3' },
        { type: 'input', name: 'category', responseKey: 'category', label: 'دسته', col: 'col-md-3' },
        { type: 'input', name: 'order', responseKey: 'order', label: 'ترتیب', col: 'col-md-3' },
        {
          type: 'tiptap-editor',
          name: 'summary',
          responseKey: 'summary',
          label: 'خلاصه',
          col: 'col-md-12',
          options: {
            bubbleMenu: false,
            floatingMenu: false,
            poem: false,
            reading: false,
            persianKeyboard: true,
            mathliveOptions: { smartFence: false },
            uploadServer: {
              url: API_ADDRESS.media.upload,
              instantUpload: true,
              responseKey: 'file',
              headers: { Authorization: 'Bearer ' + this.$store.getters['Auth/accessToken'] }
            }
          }
        },
        {
          type: 'tiptap-editor',
          name: 'text',
          responseKey: 'text',
          label: 'متن',
          col: 'col-md-12',
          options: {
            bubbleMenu: false,
            floatingMenu: false,
            poem: false,
            reading: false,
            persianKeyboard: true,
            mathliveOptions: { smartFence: false },
            uploadServer: {
              url: API_ADDRESS.media.upload,
              instantUpload: true,
              responseKey: 'file',
              headers: { Authorization: 'Bearer ' + this.$store.getters['Auth/accessToken'] }
            }
          }
        }
        // { type: 'input', name: 'value', responseKey: 'value', label: 'مقدار', col: 'col-md-12' }
      ],
      createInputs: [],
      editInputs: [],
      showInputs: [],
      indexInputs: [
        { type: 'input', name: 'id', responseKey: 'data.id', label: 'شناسه', col: 'col-md-12' }
      ]
    }
  },
  methods: {
    setTiptapEditorOptions () {
      this.defaultInputs.forEach(defaultInput => {
        if (defaultInput.type !== 'tiptap-editor') {
          return
        }

        defaultInput.uploadServer = {
          url: API_ADDRESS.media.upload,
          instantUpload: true,
          headers: {
            Authorization: 'Bearer ' + this.$store.getters['Auth/accessToken']
          }
        }
      })
    },
    getRemoveMessage (row) {
      return 'آیا از حذف ' + row.category + ' اطمینان دارید؟'
    }
  }
}
</script>

<style scoped>

</style>
