<template>
  <div class="login-page row flex">
    <q-card v-if="!userLogin"
            class="col-lg-4 col-md-5 col-sm-6 col-xs-10 login-card my-card shadow-6">
      <q-card-section class="row bg-primary text-white justify-between">
        <div class="row login-header-right-side justify-center items-center">
          <p class="login-entry-title q-ml-md q-mb-none">ورود</p>
        </div>
        <q-avatar>
        </q-avatar>
      </q-card-section>
      <q-linear-progress v-if="loadingList"
                         indeterminate
                         class="q-mt-sm" />
      <q-separator></q-separator>
      <div class="q-pa-lg">
        <q-input
          v-if="otpStep === 'sendOtp'"
          bottom-slots
          color="blue-8"
          ref="userName"
          name="userName"
          v-model="username"
          label="شماره همراه"
          @keydown.enter="sendOtp"
        >
          <template v-slot:before>
            <q-icon name="person"></q-icon>
          </template>
        </q-input>
        <q-input
          v-if="otpStep === 'loginByOtp'"
          bottom-slots
          color="blue-8"
          ref="otp"
          name="otp"
          v-model="otp"
          label="کد تایید"
          @keydown.enter="loginByOtp"
        >
          <template v-slot:before>
            <q-icon name="person"></q-icon>
          </template>
        </q-input>
        <q-card-actions align="left">
          <q-btn v-if="otpStep === 'sendOtp'"
                 color="primary"
                 label="ارسال کد تایید"
                 @click="sendOtp" />
          <q-btn v-if="otpStep === 'loginByOtp'"
                 color="primary"
                 label="ورود"
                 @click="loginByOtp" />
        </q-card-actions>
      </div>
    </q-card>
  </div>
</template>

<script>
import { mixinAuth } from 'src/mixin/Mixins'
import API_ADDRESS from 'src/api/Addresses'
export default {
  name: 'Login',
  mixins: [mixinAuth],
  data: () => ({
    userLogin: false,
    loadingList: false,
    otpStep: 'sendOtp',
    username: null,
    password: null,
    otp: null
  }),
  created () {
    if (this.getToken()) {
      this.getUserData(() => { this.redirectTo() })
    }
  },
  methods: {
    getToken () {
      return this.$store.getters['Auth/accessToken']
    },

    getEnter (targetRefKey) {
      this.$refs[targetRefKey].focus()
    },

    redirectTo () {
      let redirectTo = window.localStorage.getItem('redirectTo')
      if (!redirectTo) {
        redirectTo = 'Admin.Content.Index'
      }
      this.$router.push({ name: redirectTo })
    },

    handleErr (err) {
      this.loadingList = false
      const messages = []
      for (const key in err.data.errors) {
        err.data.errors[key].forEach(message => {
          this.$q.notify({
            type: 'negative',
            message: message,
            position: 'top'
          })
        })
      }
      if (!err.data.errors) {
        if (err.data.message) messages.push(err.data.message)
        else messages.push(err.statusText)
        this.$q.notify({
          type: 'negative',
          message: messages,
          position: 'top'
        })
      }
    },

    sendOtp () {
      this.loadingList = true
      this.$axios.post(API_ADDRESS.auth.sendOtp, {
        mobile_number: this.username
      })
        .then(() => {
          this.loadingList = false
          this.otpStep = 'loginByOtp'
        })
        .catch(err => {
          this.handleErr(err.response)
        })
    },
    loginByOtp () {
      this.loadingList = true
      this.$store.dispatch('Auth/otpLogin', {
        mobile_number: this.username,
        otp: this.otp
      })
        .then(() => {
          this.loadingList = false
          this.$axios.defaults.headers.common.Authorization = 'Bearer ' + this.$store.getters['Auth/accessToken']
          this.redirectTo()
        })
        .catch(err => {
          this.handleErr(err.response)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-page{
  height: 100vh;
  .login-card{
    margin: auto;
    .login-header-right-side{
      .login-alaa-logo{
        width: 20px;
      }
      .login-entry-title{
        font-size: 20px;
      }
    }
  }
}
</style>
