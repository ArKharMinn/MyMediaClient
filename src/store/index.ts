import { createStore } from 'vuex'

export default createStore({
  state: {
    token : '',
    userData : {}
  },
  getters: {
    getToken : state => state.token,
    getUser : state => state.userData
  },
  mutations: {
  },
  actions: {
    setToken:({state},value) => state.token = value,
    setUserData:({state},value) => state.userData = value
  },
  modules: {
  }
})
