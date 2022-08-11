import { getToken, setToken, removeToken } from '@/utils/auth'
import Cookies from 'js-cookie'
import { loginApi, getInfoApi } from '@/api/auth'

export default {
  namespaced: true,
  state: () => ({
    token: getToken() || '',
    name: '',
    avatar: '',
    roles: []
  }),
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },
  actions: {
    //#region 登录
    login({ commit }, userinfo) {
      // 将传过来的参数userinfo中需要的字段提取出来
      const { username, password, rememberMe } = userinfo
      return new Promise((resolve, reject) => {
        let apiParams = { account: username.trim(), password: password }
        console.log(apiParams)
        loginApi(apiParams)
          .then(response => {
            if (response == undefined) {
              resolve(null)
            }

            console.log('1', response)

            const { code, data, message } = response
            if (code === 0) {
              resolve(message)
            }
            // 响应成功后存储信息
            commit('SET_TOKEN', data.token)
            setToken(data.token, rememberMe)
            // todo
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    //#endregion
    //#region 获取用户信息
    getInfo({ commit }, token) {
      return new Promise((resolve, reject) => {
        getInfoApi(token)
          .then(response => {
            const { data } = response
            if (!data) {
              reject('信息获取失败,请重新登录!')
            }
            const { roles, name, avatar } = data
            if (!roles || roles.length <= 0) {
              reject('当前用户没有任何角色!')
            }
            commit('SET_ROLES', roles)
            commit('SET_NAME', name)
            commit('SET_AVATAR', avatar)
            resolve(data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    //#endregion
    //#region 注销
    logout({ commit }) {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      Cookies.remove('username')
      Cookies.remove('password')
      Cookies.remove('rememberMe')
    }
    //#endregion
  }
}
