import { constantRoutes, asyncRoutes } from '@/router/routes'
import { filterAsyncRoutes, standardApiRoutes } from '@/utils/auth'
import { getMenuByRoleApi } from '@/api/menu'

export default {
  namespaced: true,
  state: () => ({
    routes: []
  }),
  mutations: {
    SET_ROUTES: (state, routes) => {
      state.routes = constantRoutes.concat(routes)
    }
  },
  actions: {
    generateRoutes({ commit }, roles) {
      return new Promise(async resolve => {
        let accessedRoutes
        // 1.路由信息写在js中
        // if (roles.includes('超级管理员')) {
        //   accessedRoutes = asyncRoutes || []
        // } else {
        //   accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
        // }
        // 2.路由从后台接口获取
        await getMenuByRoleApi(roles).then(response => {
          accessedRoutes = standardApiRoutes(response.data)
        })

        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      })
    }
  }
}
