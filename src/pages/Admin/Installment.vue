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
                 :to="{name:'Admin.Installment.Show', params: {id: inputData.props.row.id}}">
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
        <template v-else-if="inputData.props.col.name === 'description'">
          <div v-html="inputData.props.value" />
        </template>
        <template v-else>
          {{ inputData.props.value }}
        </template>
      </q-td>
    </template>
    <template v-slot:after-entity-show>

      <portlet ref="portlet"
               class="q-mt-md">
        <template #title>
          پرداخت قسط
        </template>
        <template #toolbar>
          <q-btn flat
                 round
                 :icon="(paymentExpanded) ? 'expand_less' : 'expand_more'"
                 @click="paymentExpanded = !paymentExpanded">
            <q-tooltip>
              <span v-if="paymentExpanded">عدم نمایش فرم</span>
              <span v-else>نمایش فرم</span>
            </q-tooltip>
          </q-btn>
        </template>
        <template #content>
          <q-expansion-item v-model="paymentExpanded">
            <entity-crud-form-builder ref="payFormBuilder"
                                      v-model:value="paymentInputData"
                                      :disable="paymentLoading" />
            <div class="row">
              <div class="col text-center q-pb-lg">
                <q-btn color="primary"
                       :disable="paymentLoading"
                       :loading="paymentLoading"
                       @click="payInstallment">
                  پرداخت قسط
                </q-btn>
              </div>
            </div>
            <q-inner-loading :showing="paymentLoading">
              <q-spinner-ball color="primary"
                              size="50px" />
            </q-inner-loading>
          </q-expansion-item>
        </template>
      </portlet>
    </template>
  </entity-crud>
</template>

<script>
import API_ADDRESS from 'src/api/Addresses'
import { EntityCrud, Portlet, EntityCrudFormBuilder } from 'quasar-crud'

export default {
  name: 'Installment',
  components: {
    Portlet,
    EntityCrudFormBuilder,
    EntityCrud
  },
  data () {
    return {
      model: null,
      tags: [],
      paymentExpanded: true,
      paymentLoading: false,
      paymentInputData: [
        { type: 'input', name: 'amount', responseKey: 'amount', label: 'مبلغ', col: 'col-md-4' },
        {
          type: 'entity',
          name: 'payer',
          responseKey: 'payer_info',
          selectionMode: 'single',
          label: 'پرداخت کننده',
          buttonColor: 'primary',
          buttonTextColor: 'white',
          buttonBadgeColor: 'pink',
          indexConfig: {
            apiAddress: API_ADDRESS.user.base,
            tableTitle: 'لیست کاربران',
            showTableItemsRouteName: 'Admin.BlockManagement.Show',
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
                  name: 'nickname',
                  required: true,
                  label: 'نام',
                  align: 'left',
                  field: row => row.nickname
                },
                {
                  name: 'mobile_number',
                  required: true,
                  label: 'موبایل',
                  align: 'left',
                  field: row => row.mobile_number
                },
                {
                  name: 'phone_number',
                  required: true,
                  label: 'تلفن',
                  align: 'left',
                  field: row => row.phone_number
                },
                {
                  name: 'email',
                  required: true,
                  label: 'ایمیل',
                  align: 'left',
                  field: row => row.email
                },
                {
                  name: 'gender',
                  required: true,
                  label: 'جنسیت',
                  align: 'left',
                  field: row => row.gender
                },
                {
                  name: 'roles',
                  required: true,
                  label: 'نقش ها',
                  align: 'left',
                  field: row => row.roles.map(role => role.name).join(', ')
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
            },
            inputs: [
              { type: 'input', name: 'id', value: null, label: 'شناسه', col: 'col-md-3' },
              { type: 'input', name: 'nickname', value: null, label: 'نام', col: 'col-md-3' },
              { type: 'input', name: 'mobile_number', value: null, label: 'موبایل', col: 'col-md-3' }
            ],
            itemIdentifyKey: 'id',
            itemIndicatorKey: 'nickname'
          },
          value: [],
          selected: [],
          col: 'col-md-2'
        },
        {
          type: 'entity',
          name: 'creator',
          responseKey: 'creator_info',
          selectionMode: 'single',
          label: 'سازنده',
          buttonColor: 'primary',
          buttonTextColor: 'white',
          buttonBadgeColor: 'pink',
          indexConfig: {
            apiAddress: API_ADDRESS.user.base,
            tableTitle: 'لیست کاربران',
            showTableItemsRouteName: 'Admin.BlockManagement.Show',
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
                  name: 'nickname',
                  required: true,
                  label: 'نام',
                  align: 'left',
                  field: row => row.nickname
                },
                {
                  name: 'mobile_number',
                  required: true,
                  label: 'موبایل',
                  align: 'left',
                  field: row => row.mobile_number
                },
                {
                  name: 'phone_number',
                  required: true,
                  label: 'تلفن',
                  align: 'left',
                  field: row => row.phone_number
                },
                {
                  name: 'email',
                  required: true,
                  label: 'ایمیل',
                  align: 'left',
                  field: row => row.email
                },
                {
                  name: 'gender',
                  required: true,
                  label: 'جنسیت',
                  align: 'left',
                  field: row => row.gender
                },
                {
                  name: 'roles',
                  required: true,
                  label: 'نقش ها',
                  align: 'left',
                  field: row => row.roles.map(role => role.name).join(', ')
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
            },
            inputs: [
              { type: 'input', name: 'id', value: null, label: 'شناسه', col: 'col-md-3' },
              { type: 'input', name: 'nickname', value: null, label: 'نام', col: 'col-md-3' },
              { type: 'input', name: 'mobile_number', value: null, label: 'موبایل', col: 'col-md-3' }
            ],
            itemIdentifyKey: 'id',
            itemIndicatorKey: 'nickname'
          },
          value: [],
          selected: [],
          col: 'col-md-2'
        },
        { type: 'dateTime', name: 'due_date', responseKey: 'due_date', label: 'تاریخ', col: 'col-md-4' },
        { type: 'input', name: 'summary', responseKey: 'summary', label: 'توضیح کوتاه', col: 'col-md-12' },
        {
          type: 'tiptap-editor',
          name: 'text',
          responseKey: 'text',
          label: 'توضیحات بیشتر',
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
          },
          col: 'col-md-12'
        }
      ],
      allProps: {
        config: {
          api: API_ADDRESS.installment.base,
          title: {
            show: 'اطلاعات قسط',
            edit: 'اطلاعات قسط',
            create: 'ثبت قسط جدید',
            index: 'لیست اقساط'
          },
          showRouteName: 'Admin.Installment.Show',
          editRouteName: 'Admin.Installment.Edit',
          indexRouteName: 'Admin.Installment.Index',
          createRouteName: 'Admin.Installment.Create',
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
                name: 'amount',
                required: true,
                label: 'مبلغ',
                align: 'left',
                field: row => row.amount
              },
              {
                name: 'payer_info_nickname',
                required: true,
                label: 'نام پرداخت کننده',
                align: 'left',
                field: row => row.payer_info.nickname
              },
              {
                name: 'payer_info_mobile_number',
                required: true,
                label: 'همراه پرداخت کننده',
                align: 'left',
                field: row => row.payer_info.mobile_number
              },
              {
                name: 'length_of_payments',
                required: true,
                label: 'تعداد پرداخت ها',
                align: 'left',
                field: row => row.payments_info.length
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
        { type: 'input', name: 'id', responseKey: 'id', label: 'شناسه', col: 'col-md-1', disable: true },
        { type: 'input', name: 'amount', responseKey: 'amount', label: 'مبلغ', col: 'col-md-2' },
        {
          type: 'entity',
          name: 'payer',
          responseKey: 'payer_info',
          selectionMode: 'single',
          label: 'پرداخت کننده',
          buttonColor: 'primary',
          buttonTextColor: 'white',
          buttonBadgeColor: 'pink',
          indexConfig: {
            apiAddress: API_ADDRESS.user.base,
            tableTitle: 'لیست کاربران',
            showTableItemsRouteName: 'Admin.BlockManagement.Show',
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
                  name: 'nickname',
                  required: true,
                  label: 'نام',
                  align: 'left',
                  field: row => row.nickname
                },
                {
                  name: 'mobile_number',
                  required: true,
                  label: 'موبایل',
                  align: 'left',
                  field: row => row.mobile_number
                },
                {
                  name: 'phone_number',
                  required: true,
                  label: 'تلفن',
                  align: 'left',
                  field: row => row.phone_number
                },
                {
                  name: 'email',
                  required: true,
                  label: 'ایمیل',
                  align: 'left',
                  field: row => row.email
                },
                {
                  name: 'gender',
                  required: true,
                  label: 'جنسیت',
                  align: 'left',
                  field: row => row.gender
                },
                {
                  name: 'roles',
                  required: true,
                  label: 'نقش ها',
                  align: 'left',
                  field: row => row.roles.map(role => role.name).join(', ')
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
            },
            inputs: [
              { type: 'input', name: 'id', value: null, label: 'شناسه', col: 'col-md-3' },
              { type: 'input', name: 'nickname', value: null, label: 'نام', col: 'col-md-3' },
              { type: 'input', name: 'mobile_number', value: null, label: 'موبایل', col: 'col-md-3' }
            ],
            itemIdentifyKey: 'id',
            itemIndicatorKey: 'nickname'
          },
          value: [],
          selected: [],
          col: 'col-md-2'
        },
        {
          type: 'entity',
          name: 'creator',
          responseKey: 'creator_info',
          selectionMode: 'single',
          label: 'سازنده',
          buttonColor: 'primary',
          buttonTextColor: 'white',
          buttonBadgeColor: 'pink',
          indexConfig: {
            apiAddress: API_ADDRESS.user.base,
            tableTitle: 'لیست کاربران',
            showTableItemsRouteName: 'Admin.BlockManagement.Show',
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
                  name: 'nickname',
                  required: true,
                  label: 'نام',
                  align: 'left',
                  field: row => row.nickname
                },
                {
                  name: 'mobile_number',
                  required: true,
                  label: 'موبایل',
                  align: 'left',
                  field: row => row.mobile_number
                },
                {
                  name: 'phone_number',
                  required: true,
                  label: 'تلفن',
                  align: 'left',
                  field: row => row.phone_number
                },
                {
                  name: 'email',
                  required: true,
                  label: 'ایمیل',
                  align: 'left',
                  field: row => row.email
                },
                {
                  name: 'gender',
                  required: true,
                  label: 'جنسیت',
                  align: 'left',
                  field: row => row.gender
                },
                {
                  name: 'roles',
                  required: true,
                  label: 'نقش ها',
                  align: 'left',
                  field: row => row.roles.map(role => role.name).join(', ')
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
            },
            inputs: [
              { type: 'input', name: 'id', value: null, label: 'شناسه', col: 'col-md-3' },
              { type: 'input', name: 'nickname', value: null, label: 'نام', col: 'col-md-3' },
              { type: 'input', name: 'mobile_number', value: null, label: 'موبایل', col: 'col-md-3' }
            ],
            itemIdentifyKey: 'id',
            itemIndicatorKey: 'nickname'
          },
          value: [],
          selected: [],
          col: 'col-md-2'
        },
        { type: 'dateTime', name: 'due_date', responseKey: 'due_date', label: 'تاریخ', col: 'col-md-5' },
        { type: 'input', name: 'summary', responseKey: 'summary', label: 'توضیح کوتاه', col: 'col-md-12' },
        {
          type: 'tiptap-editor',
          name: 'text',
          responseKey: 'text',
          label: 'توضیحات بیشتر',
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
          },
          col: 'col-md-12'
        }
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
    getRemoveMessage (row) {
      return 'آیا از حذف قسط شماره  ' + row.id + ' اطمینان دارید؟'
    },
    createChainedObject (formData, chainedName, value) {
      // const formData = {}
      // const chainedName = 'a.b.c'
      // const value = 'valll'
      // getObject(formData, chainedName, value)

      let keysArray = chainedName
      if (typeof chainedName === 'string') {
        keysArray = chainedName.split('.')
      }
      if (keysArray.length === 1) {
        formData[keysArray[0]] = value
      } else {
        if (typeof formData[keysArray[0]] === 'undefined') {
          formData[keysArray[0]] = {}
        }
        const newKeysArray = keysArray.filter((item, index) => index !== 0)
        this.createChainedObject(formData[keysArray[0]], newKeysArray, value)
      }
    },
    getPayFormBuilderData () {
      const formData = {}
      const inputs = this.$refs.payFormBuilder.getValues()
      inputs.forEach(item => {
        if (item.disable || typeof item.value === 'undefined' || item.value === null) {
          return
        }

        if (item.type === 'file' && !this.isFile(item.value)) {
          return
        }

        this.createChainedObject(formData, item.name, item.value)
      })

      return formData
    },
    payInstallment () {
      this.paymentLoading = true
      const formData = this.getPayFormBuilderData()
      this.$axios.put(API_ADDRESS.installment.pay(this.$route.params.id), formData)
        .then(() => {
          this.paymentLoading = false
        })
        .catch(() => {
          this.paymentLoading = false
        })
    }
  }
}
</script>

<style scoped>

</style>
