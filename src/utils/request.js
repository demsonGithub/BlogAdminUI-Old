import axios from 'axios'
import { getToken } from '@/utils/auth'
import Config from '@/utils/website'
import { ElMessage } from 'element-plus'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  // 设置请求时间
  timeout: Config.timeout
  //设置默认请求头
})

//#region 请求拦截器
service.interceptors.request.use(
  config => {
    // todo 在请求前做一些处理
    if (getToken()) {
      config.headers['Authorization'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    config.headers['Content-Type'] = 'application/json'
    return config
  },
  err => {
    console.log('%c 请求拦截器:' + err, 'color:blue;background:yellow;')
    return Promise.reject(err)
  }
)
//#endregion

//#region 响应拦截器
service.interceptors.response.use(
  respone => {
    // todo 在接受返回数据后做一些处理
    const res = respone.data

    return res
  },
  err => {
    //响应错误
    if (error.response && error.response.status) {
      const status = error.response.status
      switch (status) {
        case 400:
          message = '请求错误'
          break
        case 401:
          message = '请求错误'
          break
        case 404:
          message = '请求地址出错'
          break
        case 408:
          message = '请求超时'
          break
        case 500:
          message = '服务器内部错误!'
          break
        case 501:
          message = '服务未实现!'
          break
        case 502:
          message = '网关错误!'
          break
        case 503:
          message = '服务不可用!'
          break
        case 504:
          message = '网关超时!'
          break
        case 505:
          message = 'HTTP版本不受支持'
          break
        default:
          message = '请求失败'
      }
      ElMessage.error(message)
      return Promise.reject(error)
    }
    return Promise.reject(err)
  }
)
//#endregion

export default service
