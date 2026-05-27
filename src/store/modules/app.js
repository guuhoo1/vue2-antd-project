const state = {
  layoutMode: localStorage.getItem('layoutMode') || 'sidebar',
  theme: localStorage.getItem('theme') || 'blue',
  collapsed: localStorage.getItem('collapsed') === 'true',
}

const mutations = {
  SET_LAYOUT_MODE(state, mode) {
    state.layoutMode = mode
    localStorage.setItem('layoutMode', mode)
  },
  SET_THEME(state, theme) {
    state.theme = theme
    localStorage.setItem('theme', theme)
  },
  TOGGLE_COLLAPSED(state) {
    state.collapsed = !state.collapsed
    localStorage.setItem('collapsed', state.collapsed)
  },
  SET_COLLAPSED(state, val) {
    state.collapsed = val
    localStorage.setItem('collapsed', val)
  },
}

const actions = {
  setLayoutMode({ commit }, mode) {
    commit('SET_LAYOUT_MODE', mode)
  },
  setTheme({ commit }, theme) {
    commit('SET_THEME', theme)
  },
  toggleCollapsed({ commit }) {
    commit('TOGGLE_COLLAPSED')
  },
  setCollapsed({ commit }, val) {
    commit('SET_COLLAPSED', val)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
