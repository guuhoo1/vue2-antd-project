const state = {
  token: localStorage.getItem('token') || '',
  name: '',
  avatar: '',
  roles: [],
}

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
    localStorage.setItem('token', token)
  },
  SET_NAME(state, name) {
    state.name = name
  },
  SET_AVATAR(state, avatar) {
    state.avatar = avatar
  },
  SET_ROLES(state, roles) {
    state.roles = roles
  },
}

const actions = {
  login({ commit }, { username }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        commit('SET_TOKEN', 'mock-token-' + Date.now())
        commit('SET_NAME', username)
        commit('SET_AVATAR', '')
        resolve()
      }, 1000)
    })
  },
  logout({ commit }) {
    return new Promise((resolve) => {
      commit('SET_TOKEN', '')
      commit('SET_NAME', '')
      commit('SET_AVATAR', '')
      commit('SET_ROLES', [])
      localStorage.removeItem('token')
      resolve()
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
