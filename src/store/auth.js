export const GET_USER = 'GET_USER';
export const GET_IS_AUTHENTICATED = 'GET_IS_AUTHENTICATED';
export const GET_USER_PROFILE = "GET_USER_PROFILE"
export const GET_AUTH_DIALOG = "GET_AUTH_DIALOG"
export const SET_AUTH_SUCCESS = 'SET_AUTH_SUCCESS';
export const SET_AUTH_LOGOUT = 'SET_AUTH_LOGOUT'
export const SET_AUTH_LOADING = "SET_AUTH_LOADING"
export const GET_AUTH_LOADING = 'GET_AUTH_LOADING'
export const SET_USER_PROFILE = "SET_USER_PROFILE"
export const SET_AUTH_DIALOG = "SET_AUTH_DIALOG"
export const SET_SNACK_BAR = "SET_SNACK_BAR "
export const GET_SNACK_BAR = "GET_SNACK_BAR"

export default {
    namespaced: true,
    state: {
        isAuthenticated: false,
        currentUser: {},
        loading: false,
        profile: {},
        authDialog: false,
        message: '',
        showSnackbar: false,
        color: ''
        
    },
  getters: {
          [GET_SNACK_BAR](state) {
            return {message: state.message,showSnackbar: state.showSnackbar,color:state.color}
          },
          [GET_USER](state) {
            return state.currentUser
          },
          [GET_IS_AUTHENTICATED](state) {
            return state.isAuthenticated
          },
          [GET_AUTH_LOADING](state) {
            return state.loading
          },
          [GET_USER_PROFILE](state) {
            return state.profile
          },
        [GET_AUTH_DIALOG](state) {
            return state.authDialog
          }
    },
  mutations: {
      
          [SET_AUTH_LOGOUT](state) {
            state.isAuthenticated = false
            state.loading = false
            state.currentUser = {}
            state.profile = {}
          },
          [SET_AUTH_SUCCESS](state, user) {
            state.isAuthenticated = true
            state.currentUser = user
          },
          [SET_SNACK_BAR](state, data) {
            state.message = data.message
            state.showSnackbar = data.showSnackbar
            state.color = data.color
          },
          [SET_AUTH_LOADING](state, loading) {
            state.loading = loading
          },
          [SET_USER_PROFILE](state, profile) {
            state.profile = profile
          },
          [SET_AUTH_DIALOG](state, dialogState) {
            state.authDialog = dialogState
          }
    }
}
