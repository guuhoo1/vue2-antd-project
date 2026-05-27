import { request, METHOD } from '@/utils/ajax/request'

export async function login(loginForm) {
  return request(`/login`, METHOD.POST, loginForm)
}

export async function logout() {
  return request(`/logout`, METHOD.POST)
}

export async function getSystemLoginInfo() {
  return request(`/getAuthUserVo`, METHOD.POST)
}

export async function getSystemInfo() {
  return request(`/getSystemInfo`, METHOD.POST)
}

export async function captcha() {
  return request(`/captcha`, METHOD.GET)
}

export async function slideCaptcha() {
  return request(`/slideCaptcha`, METHOD.GET)
}

export async function getAuthCode(param, handler) {
  return request(`/getAuthCode`, METHOD.POST, param, handler)
}

export async function verifyAuthCode(params) {
  return request(`/verifyAuthCode`, METHOD.POST, params)
}

export async function editUdid(params) {
  return request(`/editUdid`, METHOD.POST, params)
}

export async function editPwdSelf(params) {
  return request(`/editPwdSelf`, METHOD.POST, params)
}

export async function getSystemInfoLogo(tenantCode) {
  return request(`/tenant/getRootLogo/${tenantCode}`, METHOD.GET)
}

export default {
  login,
  logout,
  captcha,
  slideCaptcha,
  getAuthCode,
  verifyAuthCode,
  editUdid,
  editPwdSelf,
  getSystemLoginInfo,
  getSystemInfo,
  getSystemInfoLogo,
}
