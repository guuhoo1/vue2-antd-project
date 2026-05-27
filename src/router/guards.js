import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { hasToken } from '@/utils/token'

NProgress.configure({ showSpinner: false })

const loginIgnore = ['/login', '/default', '/sign', '/p13Login', '/sso']

const progressStart = (to, from, next) => {
  if (!NProgress.isStarted()) {
    NProgress.start()
  }
  next()
}

const loginGuard = async (to, from, next, options) => {
  const { store } = options

  if (hasToken()) {
    if (!store.state?.account?.routesConfig) {
      try {
        await store.dispatch('account/getSystemLoginInfo')
      } catch (e) {
        // continue even if fetch fails
      }
    }

    if (to.path === '/') {
      next({ path: '/dashboard' })
      return
    }

    next()
  } else {
    if (loginIgnore.includes(to.path)) {
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath },
        replace: true,
      })
    }
  }
}

const progressDone = () => {
  NProgress.done()
}

export default {
  beforeEach: [progressStart, loginGuard],
  afterEach: [progressDone],
}
