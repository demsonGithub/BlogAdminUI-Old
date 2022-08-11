import router from './index'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' // progress bar style
import { getToken, appendRoutes } from '@/utils/auth'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/404']

router.beforeEach(async (to, from, next) => {
  // 设置网页标题
  //todo
  NProgress.start()

  if (getToken()) {
    //有token
    if (to.path === '/login') {
      next()
      NProgress.done()
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          const { roles } = await store.dispatch('user/getInfo', getToken())
          // 生成路由
          const accessRoutes = await store.dispatch(
            'permission/generateRoutes',
            roles
          )
          // 添加路由
          if (accessRoutes.length > 0) {
            appendRoutes(accessRoutes)
          }

          next({ ...to, replace: true })
        } catch (error) {
          console.info('beforeEach:', error)
          next(`/login?redirect=${to.path}`)
        }
      }
      NProgress.done()
    }
  } else {
    // 没有token
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
    }
    NProgress.done()
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
