import Cookies from 'js-cookie'
import router from '@/router/index'
import Layout from '@/layout'
import Config from '@/utils/website'

const tokenKey = Config.TokenKey
//#region jsCookies存储
export function getToken() {
  return Cookies.get(tokenKey)
}

export function setToken(token, rememberMe) {
  if (rememberMe) {
    return Cookies.set(tokenKey, token, { expires: Config.tokenCookieExpires }) //自定义失效时间
  } else return Cookies.set(tokenKey, token)
}

export function removeToken() {
  return Cookies.remove(tokenKey)
}
//#endregion

//#region 过滤路由(路由写在js中，通过meta.roles去过滤)
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}

//根据meta中的role，判断是否有权限
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}
//#endregion

//#region 将后端拿到的菜单数组转换成标准格式的路由形式
export function standardApiRoutes(apiResultArray) {
  const res = []
  // 三级路由时，父级没有组件采用以下方式
  // component: { render: () => h(resolveComponent('router-view')) },
  apiResultArray.forEach(item => {
    res.push({
      path: item.path,
      name: item.name,
      component:
        item.parentId === 0 ? Layout : () => import(`@/views${item.path}`),
      meta: { title: item.name, icon: item.icon },
      children:
        item.children && item.children.length
          ? standardApiRoutes(item.children)
          : []
    })
  })

  return res
}
//#endregion
// 添加路由
export function appendRoutes(accessRoutes) {
  accessRoutes.forEach(item => {
    router.addRoute(item)
  })
  // 最后添加404页面
  const errRoute = {
    path: '/:pathMatch(.*)',
    redirect: '/404'
  }
  router.addRoute(errRoute)
}
