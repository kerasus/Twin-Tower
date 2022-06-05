<template>
  <div class="bg-primary side-menu-main-layout">
    <div class="side-logo">
      <div class="logo-image">

      </div>
    </div>
    <q-list
      class="side-menu-list"
      padding
      dark
    >
      <q-input dense
               standout="bg-deep-purple-5 text-white"
               v-model="searchText"
               @update:model-value ="search(titlesList)"
               placeholder="جست و جو">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
      <menu-item :menu="titlesList" />
    </q-list>
    <div class="log-out"
         @click="logOut">
      <span>
        <q-avatar icon="isax:logout"
                  size="30"
                  dir="rtl" />
      </span>
      <span class="logout-text">خروج </span>
    </div>
  </div>
</template>

<script>
import menuItem from 'components/Menu/SideMenu/MenuItem'
export default {
  name: 'SideMenu-dashboard',
  components: { menuItem },
  data () {
    return {
      clickedItem: null,
      searchText: '',
      titlesList: [
        // {
        //   title: 'داشبورد',
        //   icon: 'isax:home',
        //   routeName: 'dashboard',
        //   active: false,
        //   children: []
        // },
        {
          title: 'کاربران',
          routeName: 'Admin.User.Index',
          show: true,
          active: false
        },
        {
          title: 'مدیریت محتوا',
          routeName: null,
          show: true,
          open: false,
          active: false,
          children: [
            {
              title: 'محتوا',
              routeName: 'Admin.Content.Index',
              show: true,
              active: false
            },
            {
              title: 'دسته محتوا',
              routeName: 'Admin.Category.Index',
              show: true,
              active: false
            }
          ]
        },
        {
          title: 'نظرات',
          routeName: 'Admin.Feedback.Index',
          show: true,
          active: false
        },
        {
          title: 'اقساط',
          routeName: 'Admin.Installment.Index',
          show: true,
          active: false
        },
        {
          title: 'تنظیمات',
          icon: 'isax:setting-2',
          routeName: 'Admin.Settings',
          show: true,
          active: false,
          children: []
        }
      ]
    }
  },
  methods: {
    search (list, parentContain = false) {
      if (!list || list.length === 0) {
        return false
      }
      if (parentContain) {
        return true
      }
      let flag = false
      list.forEach(item => {
        const contain = item.title.includes(this.searchText)
        if (this.search(item.children, contain) || contain) {
          flag = true
          item.show = true
          item.open = true
        } else {
          item.open = false
          item.show = false
        }
      })
      return flag
    },
    logOut () {
      return this.$store.dispatch('Auth/logOut')
    }
  }
}
</script>

<style lang="scss" scoped>
.side-menu-main-layout {
  display: flex;
  flex-direction: column;
  min-width: 280px;
  min-height: 840px;
  border-radius: 30px;
  margin: 40px 0 0 24px;
  overflow-y: auto;
  @media screen and (max-width: 1919px) {
    width: 260px;
    min-height: 740px;
    margin: 30px 30px 30px 24px;
  }
  @media screen and (max-width: 1439px) {
    margin: 0 !important;
    border-radius: 0;
    width: 280px;
    //min-height: 680px;
    height: 100%;
  }
  @media screen and (max-width: 599px) {
    width: 100%;
  }

  .side-logo {
    display: flex;
    height: 167px;
    align-items: center;
    justify-content: center;
    @media screen and (max-width: 1919px) {
      height: 136px;
    }
    @media screen and (max-width: 1439px) {
      height: 100px;
    }
    @media screen and (max-width: 599px) {
      height: 110px;
    }

    .logo-image {
      width: 140px;
      height: 95px;
      @media screen and (max-width: 1919px) {
        height: 76px;
      }
      @media screen and (max-width: 1439px) {
        width: 100px;
        height: 50px;
      }

      .q-img__container {
        width: 140px;
        height: 95px;
        @media screen and (max-width: 1919px) {
          height: 76px;
        }
        @media screen and (max-width: 1439px) {
          width: 100px;
          height: 50px;
        }
      }
    }
  }

  .q-list {
    padding: 0;

    &.side-menu-list {
      margin: 0 24px 109px 24px;
      @media screen and (max-width: 1919px) {
        margin: 0 24px 34px 24px;
      }
      @media screen and (max-width: 1439px) {
        margin: 0 21px 26px 21px;
      }
      @media screen and (max-width: 599px) {
        margin: 0 18px 8px 18px;
      }

      .top-separator {
        margin: 0 40px 32px 40px;
        @media screen and (max-width: 1919px) {
          margin: 0 30px 25px 30px;
        }
        @media screen and (max-width: 1439px) {
          margin: 0 45px 22px 45px;
        }
      }

      .q-item {
        padding: 0;
        min-height: 0;

        &.item-list {
          display: flex;
          flex-direction: column;
          justify-content: center;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          padding: 0 14px 0 10px;
          border-radius: 14px;

          &.alone-item {
            height: 40px;

            &.active-route {
              .indicator {
                height: 8px;
                width: 8px;
                background-color: white;
                border-radius: 50%;
                margin: auto;
              }
            }
          }

          .section-title {
            height: 30px;
            display: flex;
            flex-direction: row;
            align-items: center;

            .title-icon {
              margin-right: 12px;
            }

            .q-item__section--side {
              padding: 0;
            }
          }

          .list-section {
            display: flex;
            flex-direction: row;
            justify-content: right;

            .q-avatar {
              height: 22px;
              width: 22px;
            }
          }
        }
      }

      .side-expansion-list {
        &.top-expansion {
          margin-bottom: 10px;
        }

        .expansion-body {
          display: flex;
          margin-left: 8px;
        }

        .q-expansion-item__content {
          .vertical-separator {
            margin: 6px 9px 9px 9px;
            @media screen and (max-width: 599px) {
              margin: 0 10px 12px 10px;
            }
          }
        }

        .q-list {
          &.list-expansion {
            margin-bottom: 0;

            .item-list-expansion {
              height: 30px;
              margin: 5px;

              .item-list-expansion-title {
                justify-content: start;
              }
            }

            .top-expansion-separator {
              margin: 0 40px 5px 40px;
              @media screen and (max-width: 1439px) {
                margin: 0 30px 5px 30px;
              }
              @media screen and (max-width: 599px) {
                margin: 0 45px 5px 45px;
              }
            }

            .list-child-item {
              height: 30px;
              justify-content: right;
              margin-bottom: 8px;
              width: 157px;
              border-radius: 10px;
              padding: 0 14px;
              @media screen and (max-width: 1439px) {
                width: 148px;
              }
              @media screen and (max-width: 599px) {
                width: 160px;
                margin-bottom: 5px;
                padding: 0 10px 0 12px;
              }

              &:last-child {
                margin-bottom: 0;
              }

              .list-child-section {
                font-size: 14px !important;
                justify-content: center;
              }
            }
          }
        }
      }

      .active-route {
        background-color: #8075DC;

        .indicator {
          height: 6px;
          width: 6px;
          background-color: white;
          border-radius: 50%;
          margin: auto;
        }
      }

    }

    .q-item__section--avatar {
      min-width: 0 !important;
    }

    a {
      text-decoration: none;
      color: white;
      padding: 0;
    }
  }

  .log-out {
    color: white;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    height: 40px !important;
    //width: 232px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    padding: 0 14px 0 10px;
    margin: 0 0 36px 27px;
    @media screen and (max-width: 1439px) {
      margin: 0 31px 33px 31px;
    }
    @media screen and (max-width: 599px) {
      margin: 0 30px 30px 30px;
      //padding: 0 0 0 10px;
    }

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }

    .q-avatar {
      height: 22px;
      width: 22px;
      margin-right: 12px;
      transform: matrix(-1, 0, 0, 1, 0, 0);
    }
  }

  &:deep(.side-menu-main-layout) {
    .q-expansion-item__container {
      .q-item {
        display: flex;
        padding: 0 10px !important;

      }

      .q-icon {
        font-size: 21px;
      }
    }
  }

}
</style>
