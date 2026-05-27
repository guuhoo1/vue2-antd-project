import { getSystemLoginInfo } from '@/services/user'

export default {
  namespaced: true,
  state: {
    user: {},
    pid: null,
    jsPid: null,
    jsPrid: null,
    s4Pid: null,
    smList: [],
    permissions: null,
    roles: null,
    routesConfig: null,
    sseStatus: '00',
  },
  getters: {
    pid: (state) => state.pid,
    jsPid: (state) => state.jsPid,
    jsPrid: (state) => state.jsPrid,
    s4Pid: (state) => state.s4Pid,
    smList: (state) => state.smList,
    user: (state) => state.user,
    permissions: (state) => state.permissions,
    roles: (state) => state.roles,
    routesConfig: (state) => state.routesConfig,
    sseStatus: (state) => state.sseStatus,
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setPid(state, pid) {
      state.pid = pid
    },
    setJsPid(state, jsPid) {
      state.jsPid = jsPid
    },
    setJsPrid(state, jsPrid) {
      state.jsPrid = jsPrid
    },
    setS4Pid(state, s4Pid) {
      state.s4Pid = s4Pid
    },
    setSmList(state, smList) {
      state.smList = smList
    },
    setPermissions(state, permissions) {
      state.permissions = permissions
    },
    setRoles(state, roles) {
      state.roles = roles
    },
    setRoutesConfig(state, routesConfig) {
      state.routesConfig = routesConfig
    },
    setSseStatus(state, sseStatus) {
      state.sseStatus = sseStatus
    },
    resetAccountInfo(state) {
      state.pid = null
      state.jsPid = null
      state.s4Pid = null
      state.smList = []
      state.user = {}
      state.permissions = null
      state.roles = null
      state.routesConfig = null
      state.sseStatus = '00'
    },
  },
  actions: {
    getSystemLoginInfo({ commit }) {
      return getSystemLoginInfo().then((res) => {
        commit('setUser', res)
        return res
      })
    },
  },
}
