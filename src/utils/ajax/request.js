import axios from 'axios'
import { getToken, setToken, removeToken, hasToken } from '../token'

axios.defaults.timeout = 999999999
axios.defaults.withCredentials = true

const AUTH_TYPE = {
  BEARER: 'Bearer',
  BASIC: 'basic',
  AUTH1: 'auth1',
  AUTH2: 'auth2',
}

const METHOD = {
  GET: 'get',
  POST: 'post',
}

const PAGE = {
  orderBy: '',
  orderDirection: '0',
  pageNums: 10,
  pageStart: 1,
  sumColumns: '',
}

async function request(url, method, params, config) {
  const auth = getToken()
  if (auth) {
    axios.defaults.headers.common['Authorization'] = auth
  }

  switch (method) {
    case METHOD.GET:
      return axios.get(url, { params, ...config })
    case METHOD.POST:
      return axios.post(url, params, config)
    default:
      return axios.get(url, { params, ...config })
  }
}

request.get = (url, params, config) => request(url, METHOD.GET, params, config)
request.post = (url, params, config) => request(url, METHOD.POST, params, config)

function setAuthorization(auth, authType = AUTH_TYPE.AUTH2) {
  switch (authType) {
    case AUTH_TYPE.BEARER:
    case AUTH_TYPE.BASIC:
    case AUTH_TYPE.AUTH1:
    case AUTH_TYPE.AUTH2:
      setToken(auth.token)
      break
    default:
      break
  }
}

function removeAuthorization(authType = AUTH_TYPE.AUTH2) {
  switch (authType) {
    case AUTH_TYPE.BEARER:
    case AUTH_TYPE.BASIC:
    case AUTH_TYPE.AUTH1:
    case AUTH_TYPE.AUTH2:
      removeToken()
      break
    default:
      break
  }
}

function checkAuthorization(authType = AUTH_TYPE.AUTH2) {
  switch (authType) {
    case AUTH_TYPE.BEARER:
    case AUTH_TYPE.BASIC:
    case AUTH_TYPE.AUTH1:
    case AUTH_TYPE.AUTH2:
      return hasToken()
    default:
      return false
  }
}

function loadInterceptors(interceptors, options) {
  const { request: reqInterceptors, response } = interceptors
  reqInterceptors.forEach((item) => {
    let { onFulfilled, onRejected } = item
    if (!onFulfilled || typeof onFulfilled !== 'function') {
      onFulfilled = (config) => config
    }
    if (!onRejected || typeof onRejected !== 'function') {
      onRejected = (error) => Promise.reject(error)
    }
    axios.interceptors.request.use(
      (config) => onFulfilled(config, options),
      (error) => onRejected(error, options)
    )
  })
  response.forEach((item) => {
    let { onFulfilled, onRejected } = item
    if (!onFulfilled || typeof onFulfilled !== 'function') {
      onFulfilled = (response) => response
    }
    if (!onRejected || typeof onRejected !== 'function') {
      onRejected = (error) => Promise.reject(error)
    }
    axios.interceptors.response.use(
      (response) => onFulfilled(response, options),
      (error) => onRejected(error, options)
    )
  })
}

export {
  METHOD,
  AUTH_TYPE,
  PAGE,
  request,
  setAuthorization,
  removeAuthorization,
  checkAuthorization,
  loadInterceptors,
}
