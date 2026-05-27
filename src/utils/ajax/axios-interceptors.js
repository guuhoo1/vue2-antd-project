import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { removeAuthorization } from './request'

NProgress.configure({ showSpinner: false })

const BASE_URL = process.env.VUE_APP_API_BASE_URL || ''

const reqCommon = {
  onFulfilled(config) {
    NProgress.start()
    if (BASE_URL && config.url && !config.url.startsWith('http')) {
      config.url = `${BASE_URL}${config.url}`
    }
    return config
  },
  onRejected(error) {
    return Promise.reject(error)
  },
}

const respCommon = {
  onFulfilled(response) {
    NProgress.done()
    return response
  },
  onRejected(error) {
    NProgress.done()
    if (error.code === 'ECONNABORTED') {
      console.error('请求超时')
    }
    return Promise.reject(error)
  },
}

const respHttp = {
  onFulfilled(response) {
    const { data } = response
    if (data && data.code) {
      if (data.code === '000401') {
        removeAuthorization()
        window.location.reload()
        return Promise.reject(new Error('会话已过期'))
      }
      if (data.code !== '000600' && data.code !== '000000' && data.code !== 200 && data.code !== '200') {
        return data
      }
    }
    return data
  },
  onRejected(error) {
    return Promise.reject(error)
  },
}

export const interceptors = {
  request: [reqCommon],
  response: [respCommon, respHttp],
}

export function loadInterceptors() {
  const { request: reqList, response: respList } = interceptors
  reqList.forEach((item) => {
    axios.interceptors.request.use(
      (config) => item.onFulfilled(config),
      (error) => item.onRejected(error)
    )
  })
  respList.forEach((item) => {
    axios.interceptors.response.use(
      (response) => item.onFulfilled(response),
      (error) => item.onRejected(error)
    )
  })
}
