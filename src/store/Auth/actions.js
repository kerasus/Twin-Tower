import API_ADDRESS from 'src/api/Addresses'

export function login (context, data) {
  return this.$axios.post(API_ADDRESS.auth.loginAdmin, data)
    .then(res => {
      // const
      // token = response.data.token.access_token,
      // tokenType = 'Bearer'
      // tokenExpiresAt = response.data.token.expires_in
      // refreshToken = response.data.token.refresh_token,
      // context.commit('updateUser', user)
      // context.commit('updateToken', token)
      // context.commit('updateTokenType', tokenType)
      // context.commit('updateTokenExpiresAt', tokenExpiresAt)
      // axios.defaults.headers.common.Authorization = tokenType + ' ' + token

      const accessToken = res.data.token.access_token
      context.commit('updateAccessToken', accessToken)

      const ca = accessToken
      const base64Url = ca.split('.')[1]
      const decodedValue = JSON.parse(window.atob(base64Url))
      context.commit('updateUser', decodedValue)
      context.commit('setAccessToken', accessToken)
    })
    .catch(error => {
      const statusCode = parseInt(error.response.status)
      if (statusCode === 401) {
        context.dispatch('logOut')
      }
    })
}
export function otpLogin (context, data) {
  return this.$axios.post(API_ADDRESS.auth.loginOtp, data)
    .then(res => {
      // const
      // token = response.data.token.access_token,
      // tokenType = 'Bearer'
      // tokenExpiresAt = response.data.token.expires_in
      // refreshToken = response.data.token.refresh_token,
      // context.commit('updateUser', user)
      // context.commit('updateToken', token)
      // context.commit('updateTokenType', tokenType)
      // context.commit('updateTokenExpiresAt', tokenExpiresAt)
      // axios.defaults.headers.common.Authorization = tokenType + ' ' + token

      const accessToken = res.data.token.access_token
      context.commit('updateAccessToken', accessToken)

      const ca = accessToken
      const base64Url = ca.split('.')[1]
      const decodedValue = JSON.parse(window.atob(base64Url))
      context.commit('updateUser', decodedValue)
      context.commit('setAccessToken', accessToken)
    })
    .catch(error => {
      const statusCode = parseInt(error.response.status)
      if (statusCode === 401) {
        context.dispatch('logOut')
      }
    })
}
export function logOut (context) {
  context.commit('updateAccessToken', null)
  context.commit('updateUser', null)
  context.commit('updateRedirectTo', null)
  delete this.$axios.defaults.headers.common.Authorization
  this.$router.push({ name: 'Login' })
}
